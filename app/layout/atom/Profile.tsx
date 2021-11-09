import React from "react";
import styled from "styled-components";
import { square } from "@css/content";
import { HeadlineS } from "@css/typography";
import { transition } from "@css/transition";
import { IconLock } from "@icon/IconLock";

const ProfileAvatar = styled.div`
    ${square("calc(10rem + 5vw)")};
    border-radius: 1rem;
    background-color: ${p => p.theme.gray200};
    border: 0.3rem solid transparent;
    ${transition("border-color", "0.1s")};

    @media ${p => p.theme.bp.l} {
        ${square("20rem")};
    }
`;

const ProfileName = styled(HeadlineS)`
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
                border-color: ${p => p.theme.gray900};
            }

            ${ProfileName} {
                color: ${p => p.theme.gray900};
            }
        }
    }

    &:active {
        ${ProfileAvatar} {
            border-color: ${p => p.theme.gray900};
        }

        ${ProfileName} {
            color: ${p => p.theme.gray900};
        }
    }
`;

const ProfileLock = styled(IconLock)`
    ${square("2.4rem")};
    margin-top: 2rem;
    color: ${p => p.theme.gray600};
`;

export const Profile: React.FC<User.Profile> = ({ name, avatar, locked }) => {
    return (
        <ProfileWrapper>
            <ProfileAvatar />
            <ProfileName>{name}</ProfileName>
            {locked && <ProfileLock />}
        </ProfileWrapper>
    );
};
