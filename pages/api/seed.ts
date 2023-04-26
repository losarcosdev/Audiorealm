import type { NextApiRequest, NextApiResponse } from "next";
import { db, seedData } from "../../database";
import Product from "../../models/Product";
import User from "../../models/User";

type Data = {
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (process.env.NODE_ENV === "production") {
    res.status(401).json({ message: "Bad request" });
  }

  switch (req.method) {
    case "GET":
      populateDB(res);
      res.status(200).json({ message: "DB Populated" });
      break;
    default:
      res.status(401).json({ message: "Bad request" });
  }
};

const populateDB = async (res: NextApiResponse<Data>) => {
  try {
    await db.connect();
    await Product.deleteMany();
    await Product.insertMany(seedData.initialData.products);
    await User.deleteMany();
    await User.insertMany(seedData.initialData.users);
    await db.disconnect();
    return res.status(200).json({ message: "DB Populated" });
  } catch (error) {
    console.log(error);
    await db.disconnect();
  }
};

export default handler;
