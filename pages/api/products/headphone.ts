import type { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../models/Product";
import { IProduct } from "../../../interfaces/products-2";
import { db } from "../../../database";

type Data =
  | {
      message?: string;
    }
  | IProduct[];

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case "GET":
      return getHeadphones(req, res);

    default:
      res.status(401).json({ message: "Bad request" });
  }
};

const getHeadphones = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    db.connect();

    const headphones = await Product.find({ category: "headphone" })
      .lean()
      .select("title images price inStock slug category -_id");

    db.disconnect();

    return res.status(200).json(headphones);
  } catch (error) {
    console.log(error);
  }
};

export default handler;
