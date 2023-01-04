import { NextApiRequest, NextApiResponse } from "next";
import { removeCookies } from "../../lib/cookies";
import { magic } from "../../lib/magic-client";
import { magicAdmin } from "../../lib/magic-server";
import { verifyToken } from "../../lib/utils";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(401).send({ msg: "User is not logged in" });
    } else {
      const userId = await verifyToken(token);
      removeCookies(res);

      try {
        await magicAdmin.users.logoutByIssuer(userId);
      } catch (error) {
        console.error("Error while logging out magic user", error);
      }
    }

    res.writeHead(302, { Location: "/login" });
    res.end();
  } catch (error) {
    console.log({ error });
    res.status(401).send({ msg: "User is not logged in" });
  }
}
