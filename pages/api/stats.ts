import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function stats(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    console.log({ cookies: req.cookies.token });

    try {
      const token = req.cookies.token;
      if (!token) res.status(403).send({ msg: "error" });
      else {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        console.log(decoded);

        res.send({ msg: "stats posted" });
      }
    } catch (error) {
      console.error("Error in /stats", error);
      res.status(500).send({ done: false, error });
    }
  }
}
