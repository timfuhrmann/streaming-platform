import React from "react";
import styled from "styled-components";
import { IconPlus } from "@icon/IconPlus";
import { square } from "@css/helper";
import { IconStar } from "@icon/IconStar";
import { transition } from "@css/helper";

const ButtonWrapper = styled.button`
    display: inline-flex;
    position: relative;
    z-index: 1;
    margin-left: 1rem;
    ${transition("color", "0.15s")};

    @media (hover: hover) {
        &:hover {
            color: ${p => p.theme.primary};
        }
    }
`;

const PlusIcon = styled(IconPlus)`
    ${square("3rem")};
`;

const StarIcon = styled(IconStar)`
    ${square("3rem")};
`;

interface CardWatchlist {
    active: boolean;
    onClick: () => void;
}

export const ButtonWatchlist: React.FC<CardWatchlist> = ({ active, onClick }) => {
    return (
        <ButtonWrapper type="button" onClick={onClick}>
            {active ? <StarIcon /> : <PlusIcon />}
        </ButtonWrapper>
    );
};
