import { NextResponse } from "next/server";

// const privatePath = ["/manage"];
// This function can be marked `async` if using `await` inside
export function middleware() {
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/manage/:path*", "/login"],
};
