import { createContext, useContext } from "react";

interface ProfileContextData {
    profile: User.Profile | null;
}

export const ProfileContext = createContext<ProfileContextData>({} as ProfileContextData);

export const useProfile = () => useContext(ProfileContext);
