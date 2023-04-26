import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { IPaypalOrderResponseStatus } from "../../../interfaces";
import { db } from "../../../database";
import Order from "../../../models/Order";

type Data = {
  message: string;
};

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case "POST":
      return payOrder(req, res);

    default:
      return res.status(200).json({ message: "Example" });
  }
};

interface IPaypalBearerToken {
  scope: string;
  access_token: string;
  token_type: string;
  app_id: string;
  expires_in: number;
  nonce: string;
}

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const SECRET_PAYPAL = process.env.SECRET_PAYPAL;

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${SECRET_PAYPAL}`,
    "utf-8"
  ).toString("base64");
  const body = new URLSearchParams("grant_type=client_credentials");

  try {
    const { data } = await axios.post<IPaypalBearerToken>(
      process.env.PAYPAL_OAUTH_URL || "",
      body,
      {
        headers: {
          Authorization: `Basic ${base64Token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log({ error });
    } else {
      console.log({ error });
    }

    return null;
  }
};

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  //TODO : validar sesion del usuario
  //TODO : validar mongo ID

  const paypalBearerToken = await getPaypalBearerToken();

  if (!paypalBearerToken) {
    return res.status(400).json({ message: "No paypal token available" });
  }

  const { transactionId = "", orderId = "" } = req.body;

  const { data } = await axios.get<IPaypalOrderResponseStatus>(
    `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`,
    {
      headers: {
        Authorization: `Bearer ${paypalBearerToken}`,
      },
    }
  );

  if (data.status !== "COMPLETED") {
    return res.status(401).json({ message: "Unknown order" });
  }

  await db.connect();

  const dbOrder = await Order.findById(orderId);

  if (!dbOrder) {
    await db.disconnect();
    return res
      .status(200)
      .json({ message: `Not found order in database with id: ${orderId}` });
  }

  if (dbOrder.total !== Number(data.purchase_units[0].amount.value)) {
    await db.disconnect();
    return res.status(200).json({
      message: "Total price manipulated - Cancelling operation - PAYPAL",
    });
  }

  dbOrder.transactionId = transactionId;
  dbOrder.isPaid = true;
  dbOrder.save();

  return res.status(200).json({ message: "Order payed" });
};

export default handler;
