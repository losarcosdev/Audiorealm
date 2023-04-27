import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  let user = {} as any;

  if (req.cookies.user) {
    user = JSON.parse(req.cookies.user);
  }

  if (!session && !user.user) {
    return NextResponse.redirect("/auth/login");
  }

  if (session) {
    if (session.user.role !== "admin") {
      return NextResponse.redirect("/");
    }
  } else {
    if (user.user.role !== "admin") {
      return NextResponse.redirect("/");
    }
  }

  return NextResponse.next();
}
