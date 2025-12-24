import { NextRequest, NextResponse } from "next/server";
import { protectedRoutes } from "./data/protectedRoutes";

export function proxy(req: NextRequest) {
    const token = req.cookies.get("_token")?.value;
    const { pathname } = req.nextUrl;
    const needsAuth = protectedRoutes.some((route) => pathname.startsWith(route));

    if (pathname.startsWith("/auth") && token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (needsAuth && !token) {
        const loginUrl = new URL("/auth", req.url);

        loginUrl.searchParams.set("back_url", pathname);

        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/auth", "/app-complaints", "/panel/:path*", "/complaints/complaints-panel"],
};
