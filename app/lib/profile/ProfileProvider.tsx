import React, { createContext, useContext, useEffect, useState } from "react";
import cookie from "cookie";
import { COOKIE_PROFILE } from "@lib/cookie";
import { profiles } from "@lib/mock/profile";
import { useRouter } from "next/router";

interface ProfileContextData {
    profile: User.Profile | null;
}

const ProfileContext = createContext<ProfileContextData>({} as ProfileContextData);

export const ProfileProvider: React.FC = ({ children }) => {
    const router = useRouter();
    const [profile, setProfile] = useState<User.Profile | null>(null);

    useEffect(() => {
        const cookies = cookie.parse(document.cookie);
        const uid = cookies[COOKIE_PROFILE];

        if (!uid) {
            return;
        }

        const profile = profiles[uid];

        if (cookies && profile) {
            setProfile(profile);
        }
    }, [router.pathname]);

    return <ProfileContext.Provider value={{ profile }}>{children}</ProfileContext.Provider>;
};

export const useProfile = () => useContext(ProfileContext);
