import { NextRequest, NextResponse } from "next/server";
import { COOKIE_PROFILE } from "../../cookie";

const PUBLIC_FILE = /\.(.*)$/;

const shouldHandleRequest = (path: string): boolean => {
    return !PUBLIC_FILE.test(path) && !path.includes("/api/") && !path.includes("/_next/image");
};

export const isProfile = (path: string) => {
    return path.startsWith("/profile");
};

export const hasProfile = (req: NextRequest) => {
    const url = req.nextUrl.clone();

    if (shouldHandleRequest(url.pathname) && !isProfile(url.pathname)) {
        const profile = req.cookies.get(COOKIE_PROFILE);

        if (!profile) {
            url.pathname = "/profile";
            return NextResponse.redirect(url);
        }
    }

    return undefined;
};
