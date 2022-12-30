import jwt, { JwtPayload } from "jsonwebtoken";

export async function verifyToken(token: string) {
  try {
    if (token) {
      const verifiedToken = (await jwt.verify(
        token,
        process.env.JWT_SECRET as string
      )) as JwtPayload;

      return verifiedToken.payload && verifiedToken.payload?.issuer;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
