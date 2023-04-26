import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IProduct } from "../../../interfaces/products-2";
import Product from "../../../models/Product";
import { isValidObjectId } from "mongoose";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config(process.env.CLOUDINARY_URL || "");

type Data =
  | {
      message: string;
    }
  | IProduct[]
  | IProduct;

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);
    case "PUT":
      return updateProduct(req, res);
    case "POST":
      return createProduct(req, res);
    default:
      return res.status(200).json({ message: "Bad request" });
  }
};

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const products = await Product.find().sort({ title: "asc" }).lean();
  await db.disconnect();

  // TODO:
  // Tendremos que actualizar las imagenes

  return res.status(200).json(products);
};

const updateProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { _id = "", images = [] } = req.body as IProduct;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({ message: "Invalid mongo ID" });
  }

  if (images.length < 2) {
    return res.status(400).json({ message: "At least 2 images" });
  }

  try {
    await db.connect();
    const product = await Product.findById(_id);

    if (!product) {
      await db.disconnect();
      return res
        .status(404)
        .json({ message: `Product not found with id: ${_id}` });
    }

    // Delete images from cloudinary
    product.images.forEach(async (image) => {
      if (!images.includes(image)) {
        const [fileId, extension] = image
          .substring(image.lastIndexOf("/") + 1)
          .split(".");

        await cloudinary.uploader.destroy(fileId);
      }
    });

    await product.update(req.body);
    await product.save();
    await db.disconnect();

    return res.status(200).json(product);
  } catch (error) {
    console.log({ error });
    await db.disconnect();
    return res.status(400).json({ message: "Check server logs" });
  }
};

const createProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { images = [] } = req.body as IProduct;

  if (images.length < 2) {
    return res.status(400).json({ message: "At least 2 images" });
  }

  try {
    await db.connect();
    const productInDB = await Product.findOne({ slug: req.body.slug });

    if (productInDB) {
      await db.disconnect();
      return res.status(400).json({
        message: `The slug must be unique , slug:${productInDB.slug} already exist`,
      });
    }

    const newProduct = new Product(req.body);

    if (!newProduct) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: "Impossible to create product - try again." });
    }

    await newProduct.save();
    await db.disconnect();
    return res.status(201).json(newProduct);
  } catch (error) {
    await db.disconnect();
    console.log({ error });
    return res.status(500).json({ message: "Check server logs." });
  }
};

export default handler;
