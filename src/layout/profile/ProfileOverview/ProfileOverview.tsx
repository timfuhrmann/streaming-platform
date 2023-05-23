import React from "react";
import styled from "styled-components";
import { text } from "@css/typography";
import { ProfileOverviewItem } from "./ProfileOverviewItem";
import { Content } from "@css/helper/content";

const ProfilesWrapper = styled(Content)``;

const ProfilesHeadline = styled.h1`
    ${text("displayLg", "bold")};
    text-align: center;
`;

const ProfileList = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 4rem 2rem;
    margin-top: 6rem;
`;

const ProfileButton = styled.a``;

interface ProfileOverview {
    profiles: Record<string, User.Profile>;
    onSelect: (profile: User.Profile) => void;
}

export const ProfileOverview: React.FC<ProfileOverview> = ({ profiles, onSelect }) => {
    return (
        <ProfilesWrapper>
            <ProfilesHeadline>Who&apos;s watching?</ProfilesHeadline>
            <ProfileList>
                {Object.keys(profiles).map(uid => (
                    <ProfileButton
                        key={uid}
                        href={`/api/profile/switch?uid=${uid}`}
                        onClick={() => onSelect(profiles[uid])}>
                        <ProfileOverviewItem {...profiles[uid]} />
                    </ProfileButton>
                ))}
            </ProfileList>
        </ProfilesWrapper>
    );
};
