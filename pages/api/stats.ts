import { NextApiRequest, NextApiResponse } from "next";
import {
  findVideoStatByUser,
  insertStats,
  updateStats,
} from "../../lib/db/hasura";
import { verifyToken } from "../../lib/utils";

export default async function stats(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.cookies.token;
    if (!token) res.status(403).send({ msg: "error, no token provided" });
    else {
      const inputParams = req.method === "POST" ? req.body : req.query;
      const { videoId } = inputParams;

      if (videoId) {
        const userId = await verifyToken(token);
        const findStat = await findVideoStatByUser(token, userId, videoId);

        const isStatExist = findStat?.length > 0;

        if (req.method === "POST") {
          const { favourited, watched = true } = req.body;

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
        } else if (req.method === "GET") {
          if (isStatExist) res.send(findStat);
          else {
            res.status(404);
            res.send({ user: null, msg: "Video not found" });
          }
        }
      }
    }
  } catch (error) {
    console.error("Error in /stats", error);
    res.status(500).send({ done: false, error });
  }
}
