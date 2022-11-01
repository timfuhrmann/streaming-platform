import React from "react";
import styled from "styled-components";
import { square } from "@css/helper";
import { transition } from "@css/helper";
import { useFocus } from "@lib/hook/useFocus";

const InputField = styled.input<{ $active: boolean }>`
    text-align: center;
    ${square("calc(4rem + 7.5vw)")};
    font-size: 3rem;
    background: none;
    border: 0.2rem solid ${p => p.theme.gray900};
    color: ${p => p.theme.gray900};
    transform: ${p => p.$active && "scale(1.1)"};
    ${transition("transform", "0.2s")};

    ${p => p.theme.breakpoints.min("m")} {
        font-size: 5rem;
    }

    ${p => p.theme.breakpoints.min("xl")} {
        ${square("20rem")};
    }
`;

interface ProfileCodeInputProps {
    focused: boolean;
    value?: string;
    onKeyUp: (e: string) => void;
}

export const ProfileCodeInput: React.FC<ProfileCodeInputProps> = ({ value, focused, onKeyUp }) => {
    const inputRef = useFocus(focused);

    return (
        <InputField
            ref={inputRef}
            type="tel"
            value={value}
            maxLength={1}
            autoComplete="off"
            onKeyUp={e => onKeyUp(e.key)}
            onChange={() => null}
            $active={focused}
        />
    );
};
