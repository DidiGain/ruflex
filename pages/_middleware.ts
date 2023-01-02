import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../lib/utils";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;
  const userId = token ? await verifyToken(token) : "";

  if (
    pathname.startsWith("_next") ||
    pathname.includes("/static") ||
    pathname.includes("/api/login") ||
    userId
  )
    return NextResponse.next();

  if ((!token || !userId) && pathname !== "/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.rewrite(url);
  }
}
