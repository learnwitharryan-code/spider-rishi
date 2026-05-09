import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/Rishisingh.pdf") {
    return NextResponse.redirect(new URL("/RishiSingh.pdf", request.url), 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Rishisingh.pdf"],
};
