import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import Order from "../../../models/Order";
import User from "../../../models/User";
import Product from "../../../models/Product";
import { IStoreStatisticsResponse } from "../../../interfaces";

type Data =
  | {
      message: string;
    }
  | IStoreStatisticsResponse;

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case "GET":
      return getStoreStatistics(req, res);

    default:
      res.status(400).json({ message: "Bad request" });
  }
};
const getStoreStatistics = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await db.connect();

  const [orders, users, products] = await Promise.all([
    Order.find(),
    User.find(),
    Product.find(),
  ]);

  const numberOfOrders = orders.length;
  const paidOrders = orders.filter((order) => order.isPaid).length;
  const unpaidOrders = numberOfOrders - paidOrders;
  const numberOfClients = users.filter(
    (client) => client.role === "client"
  ).length;
  const numberOfProducts = products.length;
  const productsWithNoStock = products.filter(
    (product) => product.inStock === 0
  ).length;
  const productsWithLowStock = products.filter(
    (product) => product.inStock <= 10
  ).length;

  await db.disconnect();

  return res.status(200).json({
    numberOfClients,
    numberOfOrders,
    numberOfProducts,
    paidOrders,
    productsWithLowStock,
    productsWithNoStock,
    unpaidOrders,
  });
};

export default handler;
