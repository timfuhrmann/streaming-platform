import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { ButtonText } from "../../css/typography";
import { transition } from "../../css/transition";

const ButtonWrapper = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    ${ButtonText};
    padding: 1rem 3rem;
    min-width: 15rem;
    background-color: ${p => p.theme.gray900};
    color: ${p => p.theme.gray50};
    ${transition("background-color", "0.15s")}

    @media (hover: hover) {
        &:hover {
            background-color: ${p => p.theme.gray800};
        }
    }

    &:active {
        background-color: ${p => p.theme.gray800};
    }
`;

interface ButtonProps {
    action?: string | (() => void);
}

export const Button: React.FC<ButtonProps> = ({ action, children }) => {
    return typeof action === "string" ? (
        <Link href={action} passHref>
            <ButtonWrapper as="a">{children}</ButtonWrapper>
        </Link>
    ) : (
        <ButtonWrapper type="button" onClick={action}>
            {children}
        </ButtonWrapper>
    );
};
