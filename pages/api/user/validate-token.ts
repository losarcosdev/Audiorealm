import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";
import { db } from "../../../database";
import bcrypt from "bcryptjs";
import { jwt } from "../../../utils";

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
    case "GET":
      return validateToken(req, res);

    default:
      res.status(400).json({ message: "Bad request" });
      break;
  }
};

const validateToken = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { token = "" } = req.cookies;

  let userId = "";

  try {
    userId = await jwt.isValidToken(token);
  } catch (error) {
    res.status(401).json({ message: "Invalid JWT" });
  }

  await db.connect();
  const user = await User.findById(userId).lean();
  await db.disconnect();

  if (!user) {
    return res.status(404).json({ message: "User not found with that ID" });
  }

  const { name, role, email, _id } = user;

  return res.status(200).json({
    token: jwt.signToken(_id, email),
    user: {
      name,
      role,
      email,
    },
  });
};

export default handler;
