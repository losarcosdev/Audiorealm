import type { NextApiRequest, NextApiResponse } from "next";
import { db, AUDIOPHILE_CONSTANTS } from "../../../database";
import Product from "../../../models/Product";
import { IProduct } from "../../../interfaces/products-2";

type Data =
  | {
      message?: string;
    }
  | IProduct[];

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);

    default:
      res.status(401).json({ message: "Bad request" });
  }
};

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { category = "all" } = req.query;

    let condition = {};

    if (
      category !== "all" &&
      AUDIOPHILE_CONSTANTS.validCategories.includes(`${category}`)
    ) {
      condition = { category };
    }

    db.connect();
    const products = await Product.find(condition)
      .lean()
      .select("title images price inStock slug category -_id");

    db.disconnect;

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
};

export default handler;
