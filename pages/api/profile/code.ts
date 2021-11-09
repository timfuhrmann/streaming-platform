import { NextApiRequest, NextApiResponse } from "next";
import { PROFILE_CODE } from "@lib/mock/profile";
import { COOKIE_PROFILE, createCookie } from "@lib/cookie";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Common.ApiResponse>
) {
    const { uid, code } = req.body;

    if (!uid || !code) {
        return res.status(500).json({
            date: Date.now(),
            message: "Invalid request.",
            status: 500,
        });
    }

    if (uid === "1" && code !== PROFILE_CODE) {
        return res.status(400).json({
            date: Date.now(),
            message: "Oops, wrong code. Please try again.",
            status: 400,
        });
    }

    res.setHeader("Set-Cookie", createCookie(COOKIE_PROFILE, uid));
    res.status(200).json({ date: Date.now(), message: "Success.", status: 200 });
}
