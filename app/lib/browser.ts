import Bowser from "bowser";
import { GetServerSidePropsContext } from "next";

export const isMobile = (userAgent: string) => {
    const browser = Bowser.getParser(userAgent);
    const { type } = browser.getPlatform();
    return "mobile" === type || "tablet" === type;
};

export const isIE = (userAgent: string) => {
    const browser = Bowser.getParser(userAgent);
    return browser.isBrowser("internet-explorer");
};

export const checkBrowserCompatibility = (ctx: GetServerSidePropsContext): boolean => {
    const ua = ctx.req.headers["user-agent"];

    if (!ua) {
        return false;
    }

    return !isMobile(ua) && !isIE(ua);
};
