import { NextRequest, NextResponse } from "next/server";
import { COOKIE_PROFILE } from "../app/lib/cookie";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const profile = req.cookies[COOKIE_PROFILE];

    if (profile || pathname.includes("api")) {
        return NextResponse.next();
    } else if (!pathname.includes("/profile")) {
        return NextResponse.redirect("/profile");
    }
}
