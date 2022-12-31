import jwt, { JwtPayload } from "jsonwebtoken";

export async function verifyToken(token: string) {
  try {
    if (token) {
      const verifiedToken = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      return verifiedToken && verifiedToken.issuer;
    }
  } catch (error) {
    console.error({ error });
    return null;
  }
}
