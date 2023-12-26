import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import Link from "next/link";
import { text } from "@css/typography";
import { transition } from "@css/helper";
import { fillParent } from "@css/helper";

const ButtonWrapper = styled.button<{ $isSecondary?: boolean }>`
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    ${text("textMd", "bold")};
    padding: 1.25rem 2rem;
    color: ${p => (p.$isSecondary ? p.theme.gray900 : p.theme.gray50)};
    border-radius: 0.4rem;
    overflow: hidden;
    transform: translateZ(0);

    &::after {
        content: "";
        ${fillParent};
        z-index: -1;
        background-color: ${p => (p.$isSecondary ? p.theme.gray600 : p.theme.gray900)};
        opacity: ${p => (p.$isSecondary ? 0.75 : 1)};
        ${transition("opacity", "0.15s")}
    }

    @media (hover: hover) {
        &:hover {
            &::after {
                opacity: ${p => (p.$isSecondary ? 0.5 : 0.75)};
            }
        }
    }

    &:active {
        &::after {
            opacity: ${p => (p.$isSecondary ? 0.5 : 0.75)};
        }
    }
`;

interface ButtonProps {
    action?: string | (() => void);
    onLink?: () => void;
    isSecondary?: boolean;
    shallow?: boolean;
    scroll?: boolean;
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
    action,
    onLink,
    isSecondary,
    shallow,
    scroll,
    children,
}) => {
    return typeof action === "string" ? (
        <Link href={action} shallow={shallow} scroll={scroll} passHref legacyBehavior>
            <ButtonWrapper as="a" onClick={onLink} $isSecondary={isSecondary}>
                {children}
            </ButtonWrapper>
        </Link>
    ) : (
        <ButtonWrapper type="button" onClick={action} $isSecondary={isSecondary}>
            {children}
        </ButtonWrapper>
    );
};
