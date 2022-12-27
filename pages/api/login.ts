import { NextApiRequest, NextApiResponse } from "next";
import { magicAdmin } from "../../lib/magic-server";
import jwt from "jsonwebtoken";
import { createNewUser, isNewUser } from "../../lib/db/hasura";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const auth = req.headers.authorization;
      const did = auth ? auth.substring(7) : "";
      const userMetadata = await magicAdmin.users.getMetadataByToken(did);

      const { issuer, email, publicAddress } = userMetadata;

      const token = jwt.sign(
        {
          ...userMetadata,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
          "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": ["user", "admin"],
            "x-hasura-default-role": "user",
            "x-hasura-user-id": `${userMetadata.issuer}`,
          },
        },
        process.env.JWT_SECRET as string
      );

      res.send({ message: "success" });
    } catch (error) {
      console.error("Something went wrong logging in", error);
      res.status(500).send({ done: false });
    }
  } else {
    res.send({ done: false });
  }
}
