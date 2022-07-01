import { NextRequest } from "next/server";
import { hasProfile } from "@lib/api/profile/middleware";

export default async function handler(req: NextRequest) {
    return hasProfile(req);
}
