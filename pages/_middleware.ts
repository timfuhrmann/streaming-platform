import { NextRequest } from "next/server";
import { hasProfile } from "@lib/profile";

export default async function handler(req: NextRequest) {
    return hasProfile(req);
}
