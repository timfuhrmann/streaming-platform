import React from "react";
import styled from "styled-components";
import { transition } from "@css/helper";

const InputField = styled.input`
    width: 100%;
    font-size: 2.5rem;
    padding-bottom: 0.5rem;
    background: none;
    border: none;
    color: ${p => p.theme.gray900};
    border-bottom: 0.2rem solid ${p => p.theme.gray600};
    ${transition("border-color", "0.1s")};

    &::placeholder {
        color: ${p => p.theme.gray600};
        ${transition("color", "0.1s")};
    }

    @media (hover: hover) {
        &:hover {
            border-color: ${p => p.theme.gray900};

            &::placeholder {
                color: ${p => p.theme.gray900};
            }
        }
    }

    &:focus,
    &:not(:placeholder-shown) {
        border-color: ${p => p.theme.gray900};

        &::placeholder {
            color: ${p => p.theme.gray900};
        }
    }

    ${p => p.theme.breakpoints.min("m")} {
        font-size: 5rem;
        letter-spacing: -0.2rem;
        border-width: 0.3rem;
        padding-bottom: 1rem;
    }

    ${p => p.theme.breakpoints.min("l")} {
        font-size: 7.5rem;
        letter-spacing: -0.25rem;
    }
`;

interface SearchInputProps {
    onInput: (value: string) => void;
    placeholder?: string;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
    ({ onInput, placeholder }, ref) => {
        return (
            <InputField
                ref={ref}
                name="search"
                placeholder={placeholder}
                onInput={e => onInput((e.target as HTMLInputElement).value)}
            />
        );
    }
);

SearchInput.displayName = "SearchInput";
