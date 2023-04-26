import { db } from ".";
import Product from "../models/Product";
import { IProduct } from "../interfaces/products-2";
import User from "../models/User";
import bcrypt from "bcryptjs";
import Order from "../models/Order";
import { IOrder } from "../interfaces/order";
import { isValidObjectId } from "mongoose";

// Fetching ProductsDB
export const getProductBySlug = async (
  slug: string
): Promise<IProduct | null> => {
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  if (!product) {
    return null;
  }

  return JSON.parse(JSON.stringify(product));
};

interface ProductSlugs {
  slug: string;
}

export const getAllProductsSlug = async (): Promise<ProductSlugs[]> => {
  await db.connect();
  const slugs = await Product.find().select("slug -_id").lean();
  await db.disconnect();

  return slugs;
};

interface GetProductBySearchTerm {
  query: string;
}

export const getProductBySearchTerm = async ({
  query,
}: GetProductBySearchTerm): Promise<IProduct[]> => {
  query = query.toString().toLowerCase();
  await db.connect();

  const products: IProduct[] = await Product.find({
    $text: { $search: query },
  })
    .lean()
    .select("title images price inStock slug -_id");

  await db.disconnect();

  return JSON.parse(JSON.stringify(products));
};

export const getAllProducts = async (): Promise<IProduct[]> => {
  await db.connect();

  const products = Product.find()
    .lean()
    .select("title images price inStock slug -_id");

  await db.disconnect();

  return products;
};

// Fetching UserDB
export const checkUserEmailPassword = async (
  email: string,
  password: string
) => {
  await db.connect();
  const user = await User.findOne({ email }).lean();
  await db.disconnect();

  if (!user) return null;

  if (!bcrypt.compareSync(password, user.password!)) return null;

  const { role, name, _id } = user;

  return { id: _id, email, name, role };
};

export const createOAuthUser = async (
  oAuthEmail: string,
  oAuthName: string
) => {
  await db.connect();
  const user = await User.findOne({ email: oAuthEmail }).lean();

  if (user) {
    await db.disconnect();
    const { _id, email, name, role } = user;
    return { _id, email, name, role };
  }

  const newUser = new User({
    email: oAuthEmail,
    name: oAuthName,
    password: bcrypt.hashSync("@"),
    role: "client",
  });
  await newUser.save();
  await db.disconnect();

  const { _id, email, name, role } = newUser;
  return { _id, email, name, role };
};

// Fetching OrdersDB
export const getOrderById = async (orderId: string): Promise<IOrder | null> => {
  if (!isValidObjectId(orderId)) return null;

  await db.connect();
  const order = await Order.findById(orderId);
  await db.disconnect();

  if (!order) return null;

  return JSON.parse(JSON.stringify(order));
};

export const getAllOrders = async (): Promise<IOrder[]> => {
  await db.connect();
  const orders = await Order.find().lean();
  await db.disconnect();

  return JSON.parse(JSON.stringify(orders));
};
