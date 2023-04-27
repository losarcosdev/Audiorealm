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
      return getEarphones(req, res);

    default:
      res.status(401).json({ message: "Bad request" });
  }
};

const getEarphones = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    db.connect();

    const earphones = await Product.find({ category: "earphone" })
      .lean()
      .select("title images price inStock slug category -_id");

    db.disconnect();

    return res.status(200).json(earphones);
  } catch (error) {
    console.log(error);
  }
};

export default handler;
