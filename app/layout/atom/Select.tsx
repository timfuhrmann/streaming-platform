import React from "react";
import styled from "styled-components";
import { HeadlineXS } from "../../css/typography";
import { IconChevron } from "../../icon/IconChevron";
import { square } from "../../css/content";

const SelectWrapper = styled.div`
    position: relative;
`;

const SelectFrame = styled.select<{ $isSecondary?: boolean }>`
    appearance: none;
    font: inherit;
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

const SelectChevron = styled(IconChevron)`
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
            <HeadlineXS>
                <SelectFrame value={value} onChange={e => onChange(e.target.value)}>
                    {Object.keys(options).map(optionKey => (
                        <option key={optionKey} value={optionKey}>
                            {options[optionKey]}
                        </option>
                    ))}
                </SelectFrame>
            </HeadlineXS>
            <SelectChevron />
        </SelectWrapper>
    );
};
