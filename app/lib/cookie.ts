import cookie, { CookieSerializeOptions } from "cookie";

export const COOKIE_PROFILE = "profile";

const defaultOptions: CookieSerializeOptions = {
    path: "/",
    sameSite: "lax",
};

const secureOptions: CookieSerializeOptions = {
    ...defaultOptions,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
};

export const createCookie = (name: string, value: string, options: CookieSerializeOptions = {}) => {
    return cookie.serialize(name, value, { ...defaultOptions, ...options });
};

export const createSecureCookie = (
    name: string,
    value: string,
    options: CookieSerializeOptions = {}
) => {
    return cookie.serialize(name, value, { ...secureOptions, ...options });
};
