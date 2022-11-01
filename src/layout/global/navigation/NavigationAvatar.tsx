import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { square } from "@css/helper";
import { Image } from "@lib/image";
import { useProfile } from "@lib/context/profile";

const AvatarWrapper = styled(Link)`
    position: relative;
    ${square("5rem")};
    border-radius: 1rem;
    overflow: hidden;
    transform: translateZ(0);
    background-color: ${p => p.theme.gray200};
`;

export const NavigationAvatar: React.FC = () => {
    const { profile } = useProfile();

    return (
        <AvatarWrapper href="/profile" passHref>
            {profile && profile.avatar && <Image src={profile.avatar} alt={profile.name} fill />}
        </AvatarWrapper>
    );
};
