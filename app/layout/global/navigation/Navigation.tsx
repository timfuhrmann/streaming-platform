import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { Content, square } from "@css/content";
import { useProfile } from "@lib/context/profile";
import { NavigationAvatar } from "./NavigationAvatar";
import { HeadlineM } from "@css/typography";
import { IconSearch } from "@icon/IconSearch";
import { useRouter } from "next/router";
import { transition } from "@css/transition";

const NavigationWrapper = styled.div`
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    background: ${p => p.theme.backgroundGradient_180_50};
`;

const NavigationInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: ${p => p.theme.navigationHeight};
`;

const NavigationGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 3rem;
`;

const Logo = styled.div`
    ${HeadlineM};
`;

const LogoMark = styled.span`
    color: ${p => p.theme.primary};
`;

const NavigationSearch = styled.div<{ $active?: boolean }>`
    display: flex;
    color: ${p => p.$active && p.theme.primary};
    ${transition("color", "0.1s")};

    @media (hover: hover) {
        &:hover {
            color: ${p => p.theme.primary};
        }
    }
`;

const SearchIcon = styled(IconSearch)`
    ${square("2.4rem")};
`;

export const Navigation: React.FC = () => {
    const router = useRouter();
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
                    <NavigationGroup>
                        <Link href="/search" passHref>
                            <NavigationSearch $active={router.pathname.includes("search")}>
                                <SearchIcon />
                            </NavigationSearch>
                        </Link>
                        <Link href="/profile" passHref>
                            <NavigationAvatar {...profile} />
                        </Link>
                    </NavigationGroup>
                </NavigationInner>
            </Content>
        </NavigationWrapper>
    );
};
