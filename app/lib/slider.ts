import { MutableRefObject, useEffect, useRef, useState } from "react";
import KeenSlider, { TOptions } from "keen-slider";

interface SliderData {
    mounted: boolean;
    activeSlide: number;
    isBeginning: boolean;
    isEnd: boolean;
    prev: () => void;
    next: () => void;
}

type SlideResult = [MutableRefObject<HTMLDivElement | null>, SliderData];

export const useSlider = (options: TOptions = {}): SlideResult => {
    const ref = useRef<HTMLDivElement | null>(null);
    const sliderRef = useRef<KeenSlider | null>(null);
    const [activeSlide, setActiveSlide] = useState<number>(0);
    const [mounted, setMounted] = useState<boolean>(false);
    const [isBeginning, setIsBeginning] = useState<boolean>(!options?.loop);
    const [isEnd, setIsEnd] = useState<boolean>(false);

    useEffect(() => {
        if (!ref.current) {
            return;
        }

        const slider = new KeenSlider(ref.current, {
            spacing: 15,
            rubberband: false,
            loop: false,
            mounted: () => setMounted(true),
            slideChanged: ref => {
                const options = ref.options();
                const details = ref.details();
                const activeSlide = details.relativeSlide;

                setActiveSlide(activeSlide);
                setIsBeginning(!options.loop && activeSlide === 0);
                setIsEnd(!options.loop && activeSlide === details.size - details.slidesPerView);
            },
            ...options,
        });

        sliderRef.current = slider;

        return () => slider.destroy();
    }, []);

    const prev = () => {
        if (!sliderRef.current) {
            return;
        }

        sliderRef.current.prev();
    };

    const next = () => {
        if (!sliderRef.current) {
            return;
        }

        sliderRef.current.next();
    };

    return [
        ref,
        {
            mounted,
            activeSlide,
            isBeginning,
            isEnd,
            prev,
            next,
        },
    ];
};
