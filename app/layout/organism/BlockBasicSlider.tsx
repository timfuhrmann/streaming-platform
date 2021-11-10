import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { Card } from "../molecule/Card";
import { aspectRatio } from "@css/content";
import { SliderTemplate } from "../template/SliderTemplate";
import { TOptions } from "keen-slider";

const CardWrapper = styled.a`
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
    title?: string;
    shows: Api.TV[];
}

export const BlockBasicSlider: React.FC<BlockBasicSliderProps> = ({ title, shows }) => {
    const sliderOptions: TOptions = {
        slidesPerView: 2,
        spacing: 15,
        breakpoints: {
            "(min-width: 768px)": {
                slidesPerView: 4,
            },
            "(min-width: 1340px)": {
                slidesPerView: 6,
            },
        },
    };

    return (
        <SliderTemplate title={title} options={sliderOptions}>
            {shows.map(show => (
                <Link key={show.id} href={{ query: { id: show.id } }} shallow passHref>
                    <CardWrapper className="keen-slider__slide">
                        <CardInner>
                            <Card {...show} />
                        </CardInner>
                    </CardWrapper>
                </Link>
            ))}
        </SliderTemplate>
    );
};
