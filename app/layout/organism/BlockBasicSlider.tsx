import React, { useRef } from "react";
import styled from "styled-components";
import { useSlider } from "../../lib/slider";
import { SliderCard } from "../molecule/SliderCard";
import { aspectRatio, Content } from "../../css/content";

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

interface BlockBasicSliderProps {
    movies: Api.Movie[];
}

export const BlockBasicSlider: React.FC<BlockBasicSliderProps> = ({ movies }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useSlider(containerRef, {
        slidesPerView: 6,
    });

    return (
        <SliderWrapper>
            <Content>
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
