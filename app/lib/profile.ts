import { NextRequest, NextResponse } from "next/server";
import { COOKIE_PROFILE } from "./cookie";

const STATIC_REGEX_EXCLUSION =
    /\.(avi|flv|mka|mkv|mov|mp4|mpeg|mpg|mp3|flac|ogg|ogm|opus|wav|webm|webp|bmp|gif|ico|jpeg|jpg|png|svg|svgz|swf|eot|otf|ttf|woff|woff2|css|less|js)$/i;

export const isFavicon = (req: NextRequest) => {
    const pathname = req.nextUrl.pathname;
    return pathname.endsWith(".ico") && pathname.indexOf("fav") > -1;
};

export const isApi = (req: NextRequest) => {
    const pathname = req.nextUrl.pathname;
    return pathname.startsWith("/api");
};

export const isProfile = (req: NextRequest) => {
    const pathname = req.nextUrl.pathname;
    return pathname.startsWith("/profile");
};

export const hasProfile = (req: NextRequest) => {
    const { pathname } = req.nextUrl;

    if (STATIC_REGEX_EXCLUSION.test(pathname) || isFavicon(req) || isApi(req) || isProfile(req)) {
        return NextResponse.next();
    }

    const profile = req.cookies[COOKIE_PROFILE];

    if (!profile) {
        return NextResponse.redirect("/profile");
    }

    return NextResponse.next();
};
