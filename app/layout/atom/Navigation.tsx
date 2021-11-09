import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { Content } from "@css/content";
import { useProfile } from "@lib/profile/ProfileProvider";
import { Avatar } from "./Avatar";
import { HeadlineM, HeadlineS } from "@css/typography";

const NavigationWrapper = styled.div`
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    background: ${p => p.theme.backgroundGradient180};
`;

const NavigationInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 0;
`;

const Logo = styled.a`
    ${HeadlineM};
`;

const LogoMark = styled.span`
    color: ${p => p.theme.primary};
`;

export const Navigation: React.FC = () => {
    const { profile } = useProfile();

    return (
        <NavigationWrapper>
            <Content>
                <NavigationInner>
                    <Link href="/" passHref>
                        <Logo>
                            Stream<LogoMark>.</LogoMark>
                        </Logo>
                    </Link>
                    {profile && (
                        <Link href="/profile" passHref>
                            <a>
                                <Avatar {...profile} />
                            </a>
                        </Link>
                    )}
                </NavigationInner>
            </Content>
        </NavigationWrapper>
    );
};
