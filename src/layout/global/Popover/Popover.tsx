import React from "react";
import styled from "styled-components";
import { fillParent, square } from "@css/helper";
import { PopoverOpener } from "./PopoverOpener";
import { CardTeaser } from "../../shared/CardTeaser";
import { IconX } from "@icon/IconX";
import { SeasonsOverview } from "../../season/SeasonsOverview/SeasonsOverview";
import { RemoveScrollBar } from "react-remove-scroll-bar";
import { Meta } from "@lib/meta";
import { usePopover, withPopover } from "./PopoverProvider";

const PopoverWrapper = styled.div`
    ${fillParent};
    z-index: 3;
    position: fixed;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;

const PopoverFrame = styled.div`
    position: relative;
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const PopoverStage = styled.div`
    position: relative;
    z-index: 1;
    flex: 1 1 0;
    width: 100%;
    max-width: 90rem;
    margin: 0 auto;
    padding-bottom: 5rem;
    background-color: ${p => p.theme.gray100};

    ${p => p.theme.breakpoints.min("l")} {
        margin: 5rem auto 0;
    }
`;

const PopoverContent = styled.div`
    border-radius: 0.8rem;
    overflow: hidden;
    transform: translateZ(0);
`;

const PopoverBody = styled.div`
    margin-top: 8rem;
`;

const PopoverRow = styled.div`
    margin-top: 6rem;

    &:first-child {
        margin: 0;
    }
`;

const PopoverOverlay = styled.button`
    ${fillParent};
    background-color: ${p => p.theme.black};
    opacity: 0.75;
`;

const PopoverClose = styled.button`
    position: absolute;
    z-index: 1;
    top: 2rem;
    right: 2rem;
    ${square("2rem")};

    &::after {
        content: "";
        position: absolute;
        z-index: -1;
        top: 50%;
        left: 50%;
        ${square("2.5rem")};
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background-color: ${p => p.theme.gray50};
        opacity: 0.5;
    }
`;

const CloseIcon = styled(IconX)`
    ${square("2rem")};
`;

export const Popover = withPopover(() => {
    const { entry, recommendations, handleClose } = usePopover();

    return (
        <PopoverWrapper key={entry.id}>
            <Meta title={`${entry.name} | Stream`} />
            <RemoveScrollBar noImportant />
            <PopoverFrame>
                <PopoverStage>
                    <PopoverContent>
                        <PopoverOpener />
                        <PopoverBody>
                            {entry.seasons.length > 0 && (
                                <PopoverRow>
                                    <SeasonsOverview seasons={entry.seasons} show={entry} />
                                </PopoverRow>
                            )}
                            {recommendations && recommendations.length > 0 && (
                                <PopoverRow>
                                    <CardTeaser
                                        headline="You could also like"
                                        shows={recommendations}
                                    />
                                </PopoverRow>
                            )}
                        </PopoverBody>
                    </PopoverContent>
                    <PopoverClose type="button" onClick={handleClose}>
                        <CloseIcon />
                    </PopoverClose>
                </PopoverStage>
                <PopoverOverlay type="button" onClick={handleClose} />
            </PopoverFrame>
        </PopoverWrapper>
    );
});
