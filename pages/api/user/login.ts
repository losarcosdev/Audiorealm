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
        _id: string;
      };
    };

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case "POST":
      return login(req, res);

    default:
      res.status(400).json({ message: "Bad request" });
      break;
  }
};

const login = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = "", password = "" } = req.body;

  await db.connect();
  const user = await User.findOne({ email }).lean();
  await db.disconnect();

  if (!user) {
    return res
      .status(404)
      .json({ message: "Not found user with those credentials" });
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return res
      .status(404)
      .json({ message: "Not found user with those credentials" });
  }

  const { name, role, _id } = user;

  const token = jwt.signToken(_id, email);

  return res.status(200).json({
    token,
    user: {
      name,
      role,
      email,
      _id,
    },
  });
};

export default handler;
