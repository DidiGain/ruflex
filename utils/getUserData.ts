import { GetServerSidePropsContext } from "next/types";
import { verifyToken } from "../lib/utils";

export const getUserIdAndToken = async (context: GetServerSidePropsContext) => {
  const token = context.req ? context.req.cookies?.token : null;
  const userId = await verifyToken(token as string);

  return { token, userId };
};
