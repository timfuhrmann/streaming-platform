import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { square } from "@css/content";

const AvatarWrapper = styled.div`
    position: relative;
    ${square("5rem")};
    border-radius: 1rem;
    overflow: hidden;
    transform: translateZ(0);
    background-color: ${p => p.theme.gray200};
`;

export const Avatar: React.FC<Partial<User.Profile>> = ({ name, avatar }) => {
    return (
        <AvatarWrapper>
            {avatar && <Image src={avatar} alt={name} layout="fill" objectFit="cover" />}
        </AvatarWrapper>
    );
};
