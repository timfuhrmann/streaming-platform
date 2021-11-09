import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { Content } from "@css/content";
import { useProfile } from "@lib/profile/ProfileProvider";
import { Avatar } from "./Avatar";

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
    justify-content: space-between;
    padding: 2rem 0;
`;

export const Navigation: React.FC = () => {
    const { profile } = useProfile();

    return (
        <NavigationWrapper>
            <Content>
                <NavigationInner>
                    <div>Streamio</div>
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
