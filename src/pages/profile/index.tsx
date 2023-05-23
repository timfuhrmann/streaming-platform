import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { ProfileOverview } from "../../layout/profile/ProfileOverview/ProfileOverview";
import { square } from "@css/helper";
import { MOCK_PROFILES } from "@lib/mock/profile";
import { GetStaticProps } from "next";
import { transition } from "@css/helper";
import { IconX } from "@icon/IconX";
import { useProfile } from "@lib/context/profile";
import { Spinner } from "../../layout/shared/Spinner";
import { useRouter } from "next/router";
import { Meta } from "@lib/meta";

const ProfilesWrapper = styled.div`
    position: relative;
    padding: 10rem 0;
    overflow-y: auto;

    ${p => p.theme.breakpoints.min("m")} {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
    }

    ${p => p.theme.breakpoints.min("l")} {
        display: flex;
        align-items: center;
    }
`;

export const CloseButton = styled(Link)`
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

const ProfileLoading = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Profile: React.FC = () => {
    const { prefetch } = useRouter();
    const { profile } = useProfile();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        prefetch("/profile/code");
    }, [prefetch]);

    return (
        <React.Fragment>
            <Meta title="Profile | Stream" />
            {loading ? (
                <ProfileLoading>
                    <Spinner />
                </ProfileLoading>
            ) : (
                <ProfilesWrapper>
                    {profile && (
                        <CloseButton href="/" passHref>
                            <Close />
                        </CloseButton>
                    )}
                    <ProfileOverview profiles={MOCK_PROFILES} onSelect={() => setLoading(true)} />
                </ProfilesWrapper>
            )}
        </React.Fragment>
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
