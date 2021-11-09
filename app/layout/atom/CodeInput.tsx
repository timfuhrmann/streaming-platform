import React from "react";
import styled from "styled-components";
import { square } from "@css/content";
import { useFocus } from "@lib/digit";
import { transition } from "@css/transition";

const InputField = styled.input<{ $active: boolean }>`
    text-align: center;
    ${square("calc(4rem + 7.5vw)")};
    font-size: 5rem;
    background: none;
    border: 0.2rem solid ${p => p.theme.gray900};
    color: ${p => p.theme.gray900};
    transform: ${p => p.$active && "scale(1.1)"};
    ${transition("transform", "0.2s")};

    @media ${p => p.theme.bp.xl} {
        ${square("20rem")};
    }
`;

interface CodeInputProps {
    focused: boolean;
    value?: string;
    onKeyUp: (e: string) => void;
}

export const CodeInput: React.FC<CodeInputProps> = ({ value, focused, onKeyUp }) => {
    const inputRef = useFocus(focused);

    return (
        <InputField
            ref={inputRef}
            type="password"
            value={value}
            maxLength={1}
            autoComplete="off"
            onKeyUp={e => onKeyUp(e.key)}
            onChange={() => null}
            $active={focused}
        />
    );
};
