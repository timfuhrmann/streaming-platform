import { NextApiRequest, NextApiResponse } from "next";
import { COOKIE_PROFILE, createCookie } from "../../../app/lib/cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { uid } = req.query;

    if (!uid || typeof uid !== "string") {
        return res.redirect("/profile");
    }

    if (uid === "1") {
        return res.redirect(`/profile/code?uid=${uid}`);
    }

    res.setHeader("Set-Cookie", createCookie(COOKIE_PROFILE, uid));
    res.redirect("/");
}
