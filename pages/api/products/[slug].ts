import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { connect, disconnect } from "../../../database/db";
import Product from "../../../models/Product";
import { IProduct } from "../../../interfaces/products-2";

type Data =
  | {
      message?: string;
    }
  | IProduct;

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case "GET":
      return getProductBySlug(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
};

const getProductBySlug = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    db.connect();

    const { slug } = req.query;

    const product = await Product.findOne({ slug }).lean();

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
    db.disconnect();
  } catch (error) {
    console.log(error);
  }
};

export default handler;
