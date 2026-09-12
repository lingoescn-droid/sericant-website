import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname === "/due-diligence/intake" &&
    request.nextUrl.searchParams.get("product") === "quick"
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/due-diligence/quick-scan";
    url.search = "";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/due-diligence/intake",
};
