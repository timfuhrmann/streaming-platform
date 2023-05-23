import { NextApiRequest, NextApiResponse } from "next";
import { COOKIE_PROFILE, createCookie } from "@lib/cookie";
import { MOCK_PROFILES } from "@lib/mock/profile";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { uid } = req.query;

    if (!uid || typeof uid !== "string") {
        return res.redirect("/profile");
    }

    const profile = MOCK_PROFILES[uid];

    if (!profile) {
        return res.redirect("/profile");
    }

    res.setHeader("Set-Cookie", createCookie(COOKIE_PROFILE, uid));
    res.redirect("/");
}
