import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useAppSelector } from "@lib/redux";
import { preloadShow } from "@lib/redux/reducer/shows";
import { fillParent, square } from "@css/content";
import { deleteParamFromQuery } from "@lib/util";
import { PopOverOpener } from "./PopOverOpener";
import { CardTeaser } from "../../block/CardTeaser";
import { getRecommendations } from "@lib/api/tmdb";
import { IconX } from "@icon/IconX";
import { SeasonsOverview } from "../../block/seasons-overview/SeasonsOverview";
import { useDispatch } from "react-redux";

const PopOverWrapper = styled.div`
    ${fillParent};
    z-index: 3;
    position: fixed;
    display: flex;
    flex-direction: column;
`;

const PopOverFrame = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto;
`;

const PopOverStage = styled.div`
    position: relative;
    z-index: 1;
    flex: 1;
    width: 100%;
    max-width: 90rem;
    margin: 0 auto;
    padding-bottom: 5rem;
    background-color: ${p => p.theme.gray100};

    @media ${p => p.theme.bp.l} {
        margin: 5rem auto 0;
    }
`;

const PopOverBody = styled.div`
    margin-top: 8rem;
`;

const PopOverRow = styled.div`
    margin-top: 6rem;

    &:first-child {
        margin: 0;
    }
`;

const PopOverOverlay = styled.button`
    ${fillParent};
    background-color: ${p => p.theme.black};
    opacity: 0.75;
`;

const PopOverClose = styled.button`
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

export const PopOver: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const { entities, fetchRequests } = useAppSelector(state => state.shows);
    const [entry, setEntry] = useState<Api.TVDetails | null>(null);
    const [recommendations, setRecommendations] = useState<Api.TV[] | null>(null);

    useEffect(() => {
        if (!id || typeof id !== "string") {
            setEntry(null);
            return;
        }

        const numId = parseInt(id);

        const entity = entities[numId];

        if (entity) {
            document.documentElement.classList.add("no-scroll");
            setEntry(entity);
        } else if (!fetchRequests.includes(numId)) {
            dispatch(preloadShow({ id: numId }));
        }

        return () => document.documentElement.classList.remove("no-scroll");
    }, [id, entities]);

    useEffect(() => {
        if (!id || typeof id !== "string") {
            return;
        }

        getRecommendations(parseInt(id)).then(setRecommendations);

        return () => setRecommendations(null);
    }, [id]);

    const handleClose = () => {
        const query = deleteParamFromQuery(router.query, "id");

        return router.push({ query }, undefined, {
            shallow: true,
        });
    };

    if (!entry) return null;

    return (
        <PopOverWrapper>
            <PopOverFrame key={entry.id}>
                <PopOverStage>
                    <PopOverOpener {...entry} />
                    <PopOverBody>
                        {entry.seasons.length > 0 && (
                            <PopOverRow>
                                <SeasonsOverview seasons={entry.seasons} show={entry} />
                            </PopOverRow>
                        )}
                        {recommendations && (
                            <PopOverRow>
                                <CardTeaser
                                    headline="You could also like"
                                    shows={recommendations}
                                />
                            </PopOverRow>
                        )}
                    </PopOverBody>
                    <PopOverClose type="button" onClick={handleClose}>
                        <CloseIcon />
                    </PopOverClose>
                </PopOverStage>
                <PopOverOverlay type="button" onClick={handleClose} />
            </PopOverFrame>
        </PopOverWrapper>
    );
};
