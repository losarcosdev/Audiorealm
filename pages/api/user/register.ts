import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";
import { db } from "../../../database";
import bcrypt from "bcryptjs";
import { jwt, validations } from "../../../utils";

type Data =
  | {
      message: string;
    }
  | {
      token: string;
      user: {
        name: string;
        role: "admin" | "client";
        email: string;
      };
    };

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case "POST":
      return register(req, res);

    default:
      res.status(400).json({ message: "Bad request" });
      break;
  }
};

const register = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = "", password = "", name = "" } = req.body;

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must have at least 6 characters" });
  }

  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: "Name must have at least 3 characters" });
  }

  if (!validations.isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }

  await db.connect();
  const user = await User.findOne({ email }).lean();

  if (user) {
    return res.status(400).json({ message: "That email is already in use" });
  }

  const newUser = new User({
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password),
    role: "client",
    name,
  });

  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Check server logs" });
  }

  const { _id, role } = newUser;

  const token = jwt.signToken(_id, email);

  return res.status(200).json({
    token,
    user: {
      name,
      role,
      email,
    },
  });
};

export default handler;
