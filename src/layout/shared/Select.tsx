import React from "react";
import styled from "styled-components";
import { text } from "@css/typography";
import { IconChevronDown } from "@icon/IconChevronDown";
import { square } from "@css/helper";

const SelectWrapper = styled.div`
    position: relative;
`;

const SelectFrame = styled.select<{ $isSecondary?: boolean }>`
    appearance: none;
    font: inherit;
    ${text("textLg", "bold")};
    background: none;
    color: ${p => p.theme.white};
    height: 5rem;
    padding: 0 3.5rem 0 1.5rem;
    min-width: 12.5rem;
    max-width: 25rem;
    border-color: ${p => p.theme.gray200};
    color: ${p => p.theme.gray900};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const SelectChevron = styled(IconChevronDown)`
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    ${square("1.8rem")}
    pointer-events: none;
`;

interface SelectProps {
    value: number;
    onChange: (value: string) => void;
    options: Record<string | number, string>;
}

export const Select: React.FC<SelectProps> = ({ value, options, onChange }) => {
    return (
        <SelectWrapper>
            <SelectFrame value={value} onChange={e => onChange(e.target.value)}>
                {Object.keys(options).map(optionKey => (
                    <option key={optionKey} value={optionKey}>
                        {options[optionKey]}
                    </option>
                ))}
            </SelectFrame>
            <SelectChevron />
        </SelectWrapper>
    );
};
