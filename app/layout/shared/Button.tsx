import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import Link from "next/link";
import { ButtonText } from "@css/typography";
import { transition } from "@css/transition";
import { fillParent } from "@css/content";

const ButtonWrapper = styled.button<{ $isSecondary?: boolean }>`
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    ${ButtonText};
    padding: 1.5rem 3rem;
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
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
    action,
    onLink,
    isSecondary,
    children,
}) => {
    return typeof action === "string" ? (
        <Link href={action} passHref shallow>
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
