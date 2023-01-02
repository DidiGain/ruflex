import { NextApiRequest, NextApiResponse } from "next";
import { removeCookies } from "../../lib/cookies";
import { magicAdmin } from "../../lib/magic-server";
import { verifyToken } from "../../lib/utils";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!req.cookies.token) {
      return res.status(401).send({ msg: "User is not logged in" });
    }

    const token = req.cookies.token;
    const userId = await verifyToken(token);
    removeCookies(res);

    try {
      await magicAdmin.users.logoutByIssuer(userId);
    } catch (error) {
      console.error("Error while logging out magic user", error);
    }

    res.writeHead(302, { Location: "/login" });
    res.end();
  } catch (error) {
    res.status(401).send({ msg: "User is not logged in" });
  }
}
