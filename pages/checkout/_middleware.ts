import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  let user = {} as any;

  if (req.cookies.user) {
    user = JSON.parse(req.cookies.user);
  }

  if (!session && !user.user) {
    const requestedPage = req.page.name;
    return NextResponse.redirect(`/auth/login?p=${requestedPage}`);
  }

  return NextResponse.next();
}
