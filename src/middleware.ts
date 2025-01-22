import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// const privatePath = ["/manage"];
const unAuthPath = ["/login"];
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // const isAuth = Boolean(request.cookies.get("accessToken")?.value);
  // if (unAuthPath.some((path) => pathname.startsWith(path)) && isAuth) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/manage/:path*", "/login"],
};
