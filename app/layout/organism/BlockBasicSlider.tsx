import React, { useRef } from "react";
import styled from "styled-components";
import { useSlider } from "../../lib/slider";
import { SliderCard } from "../molecule/SliderCard";
import { aspectRatio, Content } from "../../css/content";
import { HeadlineM } from "../../css/typography";

const SliderWrapper = styled.div`
    overflow: hidden;
`;

const SliderContainer = styled.div`
    overflow: visible;
`;

const CardWrapper = styled.button`
    position: relative;
    ${aspectRatio(1.5)};
`;

const CardInner = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const SliderTitle = styled(HeadlineM)`
    margin-bottom: 1rem;
`;

interface BlockBasicSliderProps {
    title?: string;
    movies: Api.Movie[];
}

export const BlockBasicSlider: React.FC<BlockBasicSliderProps> = ({ title, movies }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useSlider(containerRef, {
        slidesPerView: 6,
    });

    return (
        <SliderWrapper>
            <Content>
                {title && <SliderTitle>{title}</SliderTitle>}
                <SliderContainer ref={containerRef} className="keen-slider">
                    {movies.map(movie => (
                        <CardWrapper key={movie.id} className="keen-slider__slide">
                            <CardInner>
                                <SliderCard {...movie} />
                            </CardInner>
                        </CardWrapper>
                    ))}
                </SliderContainer>
            </Content>
        </SliderWrapper>
    );
};
