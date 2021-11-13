import React from "react";
import styled from "styled-components";
import { BlockProfile } from "../../app/layout/molecule/BlockProfile";
import { square } from "@css/content";
import { profiles } from "@lib/mock/profile";
import { GetStaticProps } from "next";
import Link from "next/link";
import { transition } from "@css/transition";
import { IconX } from "@icon/IconX";
import { useProfile } from "@lib/profile/ProfileProvider";

const ProfilesWrapper = styled.div`
    position: relative;
    padding: 10rem 0;
    overflow-y: auto;

    @media ${p => p.theme.bp.m} {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
    }

    @media ${p => p.theme.bp.l} {
        display: flex;
        align-items: center;
    }
`;

export const CloseButton = styled.a`
    position: absolute;
    top: 2.4rem;
    right: 2.4rem;
    color: ${p => p.theme.gray600};
    ${transition("color", "0.2s")};

    @media (hover: hover) {
        &:hover {
            color: ${p => p.theme.gray900};
        }
    }

    &:active {
        color: ${p => p.theme.gray900};
    }
`;

export const Close = styled(IconX)`
    ${square("6rem")};
`;

const Profile: React.FC = () => {
    const { profile } = useProfile();

    return (
        <ProfilesWrapper>
            {profile && (
                <Link href="/" passHref>
                    <CloseButton>
                        <Close />
                    </CloseButton>
                </Link>
            )}
            <BlockProfile profiles={profiles} />
        </ProfilesWrapper>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            hideNavigation: true,
        },
    };
};

export default Profile;
