import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export const middleware = async (req: NextRequest) => {
  const token = cookies().get("token")?.value;
  if (!token) {
    if (
      req.nextUrl.pathname === "/login" ||
      req.nextUrl.pathname === "/sign-up" ||
      req.nextUrl.pathname === "/verify" ||
      req.nextUrl.pathname === "/forgot-password" ||
      req.nextUrl.pathname === "/change-password"
    ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );
  if (!payload.email) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (
    req.nextUrl.pathname === "/login" ||
    req.nextUrl.pathname === "/sign-up" ||
    req.nextUrl.pathname === "/verify" ||
    req.nextUrl.pathname === "/forgot-password" ||
    req.nextUrl.pathname === "/change-password"
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  return NextResponse.next();
};

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/sign-up",
    "/verify",
    "/forgot-password",
    "/change-password",
    "/change-user-password",
  ],
};
