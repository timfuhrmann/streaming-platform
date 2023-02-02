import { MutableRefObject, useEffect, useRef, useState } from "react";
import KeenSlider, { KeenSliderInstance, KeenSliderOptions, KeenSliderPlugin } from "keen-slider";

interface SliderData {
    slider: KeenSliderInstance | null;
    mounted: boolean;
    isBeginning: boolean;
    isEnd: boolean;
    next: () => void;
    prev: () => void;
}

export interface SliderOptions extends KeenSliderOptions {
    observeMutations?: boolean;
}

export type SlideResult = [MutableRefObject<HTMLDivElement | null>, SliderData];

export const useSlider = ({ observeMutations, ...options }: SliderOptions = {}): SlideResult => {
    const ref = useRef<HTMLDivElement | null>(null);
    const sliderRef = useRef<KeenSliderInstance | null>(null);
    const [mounted, setMounted] = useState<boolean>(false);
    const [isBeginning, setIsBeginning] = useState<boolean>(options ? !options.loop : true);
    const [isEnd, setIsEnd] = useState<boolean>(false);

    useEffect(() => {
        if (!ref.current) {
            return;
        }

        const slider = new KeenSlider(
            ref.current,
            {
                rubberband: false,
                created: ref => {
                    setMounted(true);
                    handleDetails(ref);
                },
                slideChanged: handleDetails,
                ...options,
            },
            [MutationPlugin]
        );

        sliderRef.current = slider;

        return () => slider.destroy();
    }, []);

    const MutationPlugin: KeenSliderPlugin = slider => {
        if (!observeMutations) {
            return;
        }

        const observer = new MutationObserver(() => {
            slider.update(slider.options);
        });

        slider.on("created", () => {
            observer.observe(slider.container, { childList: true });
        });

        slider.on("destroyed", () => {
            observer.disconnect();
        });
    };

    const handleDetails = (ref: KeenSliderInstance) => {
        const opt = ref.options;
        const details = ref.track.details;

        setIsBeginning(!opt.loop && details.rel === details.minIdx);
        setIsEnd(!opt.loop && details.rel === details.maxIdx);
    };

    const next = () => {
        if (!sliderRef.current) {
            return;
        }

        sliderRef.current.next();
    };

    const prev = () => {
        if (!sliderRef.current) {
            return;
        }

        sliderRef.current.prev();
    };

    return [
        ref,
        {
            slider: sliderRef.current,
            mounted,
            isBeginning,
            isEnd,
            next,
            prev,
        },
    ];
};
