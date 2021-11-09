import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@lib/redux";
import { preloadShow } from "@lib/redux/reducer/shows";
import { fillParent, square } from "@css/content";
import { deleteParamFromQuery } from "@lib/util";
import { PopUpOpener } from "../molecule/PopUpOpener";
import { BlockTeaser } from "../organism/BlockTeaser";
import { getRecommendations } from "@lib/api/tmdb";
import { IconX } from "@icon/IconX";
import { BlockSeasons } from "../organism/BlockSeasons";

const PopUpWrapper = styled.div`
    ${fillParent};
    position: fixed;
    display: flex;
    flex-direction: column;
`;

const PopUpFrame = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto;
`;

const PopUpStage = styled.div`
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

const PopUpBody = styled.div`
    margin-top: 8rem;
`;

const PopUpRow = styled.div`
    margin-top: 6rem;

    &:first-child {
        margin: 0;
    }
`;

const PopUpOverlay = styled.button`
    ${fillParent};
    background-color: ${p => p.theme.black};
    opacity: 0.75;
`;

const PopUpClose = styled.button`
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

export const MoviePopUp: React.FC = () => {
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
        <PopUpWrapper>
            <PopUpFrame key={entry.id}>
                <PopUpStage>
                    <PopUpOpener {...entry} />
                    <PopUpBody>
                        <PopUpRow>
                            <BlockSeasons seasons={entry.seasons} show={entry} />
                        </PopUpRow>
                        {recommendations && (
                            <PopUpRow>
                                <BlockTeaser
                                    headline="You could also like"
                                    shows={recommendations}
                                />
                            </PopUpRow>
                        )}
                    </PopUpBody>
                    <PopUpClose type="button" onClick={handleClose}>
                        <CloseIcon />
                    </PopUpClose>
                </PopUpStage>
                <PopUpOverlay type="button" onClick={handleClose} />
            </PopUpFrame>
        </PopUpWrapper>
    );
};
