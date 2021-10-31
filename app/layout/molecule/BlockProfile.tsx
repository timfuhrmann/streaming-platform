import React from "react";
import styled from "styled-components";
import { HeadlineL } from "../../css/typography";
import { Profile } from "../atom/Profile";
import { Content } from "../../css/content";

const ProfilesWrapper = styled(Content)``;

const ProfilesHeadline = styled(HeadlineL)`
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

interface BlockProfileProps {
    profiles: User.Profile[];
}

export const BlockProfile: React.FC<BlockProfileProps> = ({ profiles }) => {
    return (
        <ProfilesWrapper>
            <ProfilesHeadline>Who&apos;s watching?</ProfilesHeadline>
            <ProfileList>
                {profiles.map(profile => (
                    <ProfileButton
                        key={profile.uid}
                        href={`/api/profile/switch?uid=${profile.uid}`}>
                        <Profile {...profile} />
                    </ProfileButton>
                ))}
            </ProfileList>
        </ProfilesWrapper>
    );
};
