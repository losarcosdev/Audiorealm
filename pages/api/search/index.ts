import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case "GET":
      return res.status(400).json({ message: "Must specify search term" });

    default:
      return res.status(400).json({ message: "Bad request" });
  }
};

export default handler;
