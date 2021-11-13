import React from "react";
import styled from "styled-components";
import { transition } from "@css/transition";

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

    @media ${p => p.theme.bp.m} {
        font-size: 5rem;
        letter-spacing: -0.2rem;
        border-width: 0.3rem;
        padding-bottom: 1rem;
    }

    @media ${p => p.theme.bp.l} {
        font-size: 7.5rem;
        letter-spacing: -0.25rem;
    }
`;

interface SearchInputProps {
    onInput: (value: string) => void;
    placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onInput, placeholder }) => {
    return (
        <InputField
            name="search"
            placeholder={placeholder}
            onInput={e => onInput((e.target as HTMLInputElement).value)}
        />
    );
};
