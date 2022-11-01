import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { square } from "@css/helper";
import { NavigationAvatar } from "./NavigationAvatar";
import { text } from "@css/typography";
import { IconSearch } from "@icon/IconSearch";
import { useRouter } from "next/router";
import { transition } from "@css/helper";
import { content } from "@css/helper/content";
import { fullWidthClassName } from "react-remove-scroll-bar";

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
    ${content()};
    min-height: ${p => p.theme.navigationHeight};
`;

const NavigationGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 3rem;
`;

const LogoLink = styled(Link)`
    ${text("displaySm", "bold")};
`;

const LogoMark = styled.span`
    color: ${p => p.theme.primary};
`;

const NavigationSearch = styled(Link)<{ $active?: boolean }>`
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
    const { pathname } = useRouter();

    return (
        <NavigationWrapper>
            <div className={fullWidthClassName}>
                <NavigationInner>
                    <LogoLink href="/" passHref>
                        Stream<LogoMark>.</LogoMark>
                    </LogoLink>
                    <NavigationGroup>
                        <NavigationSearch
                            href="/search"
                            passHref
                            $active={pathname.startsWith("/search")}>
                            <SearchIcon />
                        </NavigationSearch>
                        <NavigationAvatar />
                    </NavigationGroup>
                </NavigationInner>
            </div>
        </NavigationWrapper>
    );
};
