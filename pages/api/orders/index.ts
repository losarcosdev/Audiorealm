import type { NextApiRequest, NextApiResponse } from "next";
import { IOrder } from "../../../interfaces/order";
import { getSession } from "next-auth/react";
import { db } from "../../../database";
import Product from "../../../models/Product";
import Order from "../../../models/Order";
import User from "../../../models/User";

type Data =
  | {
      message: string;
    }
  | IOrder;

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case "POST":
      return createOrder(req, res);

    default:
      break;
  }

  res.status(400).json({ message: "Bad request" });
};

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { orderItems, total: totalFront } = req.body as IOrder;
  const session: any = await getSession({ req });

  let user = {} as any;

  if (req.cookies.user) {
    user = JSON.parse(req.cookies.user);
  }

  if (!session && !user.user) {
    return res.status(401).json({
      message: "Unauthorized - You must be logged in to perform this action",
    });
  }

  const productsIds = orderItems.map((product) => product._id);
  await db.connect();

  const dbProducts = await Product.find({ _id: { $in: productsIds } });

  try {
    let subtotal = 0;

    for (const product of orderItems) {
      const dbProductPrice = dbProducts.find(
        (dbProduct) => dbProduct.id === product._id
      )?.price;

      if (dbProductPrice !== product.price) {
        throw new Error("Price manipulated - cancelling operation");
      }

      subtotal += dbProductPrice * product.quantity;
    }

    const taxRate = Number(process.env.NEXT_PUBLIC_TAXT_RATE);
    const totalBackend = +Number(subtotal * (taxRate + 1)).toFixed(2);

    if (totalFront !== totalBackend) {
      throw new Error("Total manipulated - cancelling operation");
    }

    if (session) {
      const userId = session.user._id;
      user = await User.findById(userId);
    } else {
      const userId = user.user._id;
      user = await User.findById(userId);
    }

    const newOrder = new Order({ ...req.body, isPaid: false, user });
    await newOrder.save();

    return res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
  }
};

export default handler;
