import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import {
  findVideoStatByUser,
  insertStats,
  updateStats,
} from "../../lib/db/hasura";
import { verifyToken } from "../../lib/utils";

export default async function stats(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    console.log({ cookies: req.cookies.token });

    try {
      const token = req.cookies.token;
      if (!token) res.status(403).send({ msg: "error" });
      else {
        const userId = await verifyToken(token);
        const videoId = req.query.videoId as string;
        const { favourited, watched = true } = req.body;

        const findStat = await findVideoStatByUser(token, userId, videoId);
        const isStatExist = findStat?.length > 0;

        console.log(`is stat: ${isStatExist}`);

        if (isStatExist) {
          //update
          const response = await updateStats(token, {
            userId,
            videoId,
            favourited,
            watched,
          });
          res.send({ data: response });
        } else {
          //insert
          const response = await insertStats(token, {
            userId,
            videoId,
            favourited,
            watched,
          });
          res.send({ data: response });
        }

        res.send({ msg: "stats posted" });
      }
    } catch (error) {
      console.error("Error in /stats", error);
      res.status(500).send({ done: false, error });
    }
  }
}
