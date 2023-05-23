import React from "react";
import styled from "styled-components";
import { fillParent, square } from "@css/helper";
import { text } from "@css/typography";
import { transition } from "@css/helper";
import { Image } from "@lib/image";

const ProfileAvatar = styled.div`
    position: relative;
    ${square("calc(10rem + 5vw)")};
    border-radius: 1rem;
    background-color: ${p => p.theme.gray200};
    overflow: hidden;
    transform: translateZ(0);

    &::after {
        content: "";
        ${fillParent};
        border: 0.3rem solid ${p => p.theme.gray900};
        border-radius: 1rem;
        opacity: 0;
        ${transition("opacity", "0.1s")};
    }

    ${p => p.theme.breakpoints.min("l")} {
        ${square("20rem")};
    }
`;

const ProfileName = styled.h3`
    ${text("textXl", "bold")};
    margin-top: 1rem;
    color: ${p => p.theme.gray600};
    ${transition("color", "0.1s")};
`;

const ProfileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (hover: hover) {
        &:hover {
            ${ProfileAvatar} {
                &::after {
                    opacity: 1;
                }
            }

            ${ProfileName} {
                color: ${p => p.theme.gray900};
            }
        }
    }

    &:active {
        ${ProfileAvatar} {
            &::after {
                opacity: 1;
            }
        }

        ${ProfileName} {
            color: ${p => p.theme.gray900};
        }
    }
`;

export const ProfileOverviewItem: React.FC<User.Profile> = ({ name, avatar }) => {
    return (
        <ProfileWrapper>
            <ProfileAvatar>{avatar && <Image src={avatar} alt={name} fill />}</ProfileAvatar>
            <ProfileName>{name}</ProfileName>
        </ProfileWrapper>
    );
};
