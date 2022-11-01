import { NextRequest, NextResponse } from "next/server";
import { COOKIE_PROFILE } from "@lib/cookie";

const PUBLIC_FILE = /\.(.*)$/;

const shouldHandleRequest = (path: string): boolean => {
    return !PUBLIC_FILE.test(path) && !path.startsWith("/api") && !path.startsWith("/_next");
};

const isProfile = (path: string) => {
    return path.startsWith("/profile");
};

export default async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const url = req.nextUrl.clone();

    if (shouldHandleRequest(url.pathname) && !isProfile(url.pathname)) {
        const profile = req.cookies.get(COOKIE_PROFILE);

        if (!profile) {
            url.pathname = "/profile";
            return NextResponse.redirect(url);
        }
    }

    return res;
}
