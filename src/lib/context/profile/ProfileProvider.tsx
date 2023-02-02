import React, { PropsWithChildren, useEffect, useState } from "react";
import cookie from "cookie";
import { COOKIE_PROFILE } from "@lib/cookie";
import { MOCK_PROFILES } from "@lib/mock/profile";
import { useRouter } from "next/router";
import { ProfileContext } from "@lib/context/profile/index";

export const ProfileProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    const [profile, setProfile] = useState<User.Profile | null>(null);

    useEffect(() => {
        const cookies = cookie.parse(document.cookie);
        const uid = cookies[COOKIE_PROFILE];

        if (!uid) {
            return;
        }

        const profile = MOCK_PROFILES[uid];

        if (cookies && profile) {
            setProfile(profile);
        }
    }, [router.pathname]);

    return <ProfileContext.Provider value={{ profile }}>{children}</ProfileContext.Provider>;
};
