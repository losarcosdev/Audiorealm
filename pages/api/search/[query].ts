import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { connect, disconnect } from "../../../database/db";
import Product from "../../../models/Product";
import { IProduct } from "../../../interfaces/products-2";

type Data = {
  message?: string;
  products?: IProduct[];
};

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case "GET":
      return getProductBySearchTerm(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
};

const getProductBySearchTerm = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    let { query = "" } = req.query;

    query = query.toString().toLowerCase();

    await db.connect();
    const products: IProduct[] = await Product.find({
      $text: { $search: query },
    })
      .lean()
      .select("title images price inStock slug -_id");

    if (!products) {
      return res.status(400).json({ message: "Product not found" });
    }

    await db.disconnect();

    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
  }
};

export default handler;
