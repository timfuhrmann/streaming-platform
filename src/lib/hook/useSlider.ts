import { MutableRefObject, useEffect, useRef, useState } from "react";
import KeenSlider, { KeenSliderInstance, KeenSliderOptions, KeenSliderPlugin } from "keen-slider";

interface KeenAnimation {
    duration?: number;
    easing?: (t: number) => number;
}

interface Position {
    rel: number;
    abs: number;
}

interface SliderData {
    slider: KeenSliderInstance | null;
    mounted: boolean;
    disabled: boolean;
    isBeginning: boolean;
    isEnd: boolean;
    position: Position;
    moveToSlide: (index: number) => void;
    moveByView: (direction?: "forwards" | "backwards") => void;
    next: () => void;
    prev: () => void;
}

export interface SliderOptions extends KeenSliderOptions {
    observeMutations?: boolean;
    autoRun?: number;
    autoDisable?: boolean;
    condition?: boolean;
}

export type SlideResult = [MutableRefObject<HTMLDivElement | null>, SliderData];

export const useSlider = ({
    autoRun,
    autoDisable,
    observeMutations,
    condition,
    ...options
}: SliderOptions = {}): SlideResult => {
    const ref = useRef<HTMLDivElement | null>(null);
    const sliderRef = useRef<KeenSliderInstance | null>(null);
    const [mounted, setMounted] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(autoDisable ?? false);
    const [isBeginning, setIsBeginning] = useState<boolean>(options ? !options.loop : true);
    const [isEnd, setIsEnd] = useState<boolean>(false);
    const [position, setPosition] = useState<Position>({
        rel: options.initial || 0,
        abs: options.initial || 0,
    });

    useEffect(() => {
        if (!ref.current || condition === false) {
            return;
        }

        const slider = new KeenSlider(
            ref.current,
            {
                disabled: autoDisable,
                rubberband: false,
                created: ref => {
                    setMounted(true);
                    handleDetails(ref);
                },
                optionsChanged: ref => {
                    setDisabled(ref.options.disabled ?? false);
                },
                slideChanged: handleDetails,
                ...options,
            },
            [AutoDisablePlugin, AutoRunPlugin, MutationPlugin]
        );

        sliderRef.current = slider;

        return () => slider.destroy();
    }, [condition]);

    const AutoDisablePlugin: KeenSliderPlugin = slider => {
        if (!autoDisable) {
            return;
        }

        const calcDisabled = () => {
            const { scrollWidth, offsetWidth } = slider.container;

            const isDisabled = scrollWidth <= offsetWidth;

            slider.update({
                ...slider.options,
                disabled: isDisabled,
            });
        };

        calcDisabled();

        let width = window.innerWidth;

        const onResize = () => {
            if (!width || width === window.innerWidth) {
                return;
            }

            width = window.innerWidth;

            calcDisabled();
        };

        window.addEventListener("resize", onResize);

        slider.on("destroyed", () => {
            window.removeEventListener("resize", onResize);
        });
    };

    const AutoRunPlugin: KeenSliderPlugin = slider => {
        if (!autoRun) {
            return;
        }

        const animation: KeenAnimation = { duration: autoRun, easing: t => t };

        setTimeout(() => {
            slider.update({
                ...slider.options,
                loop: true,
                renderMode: "performance",
                mode: "free",
                optionsChanged(ref) {
                    setDisabled(ref.options.disabled ?? false);
                    ref.moveToIdx(ref.track.details.abs + 2, true, animation);
                },
                animationEnded(ref) {
                    ref.moveToIdx(ref.track.details.abs + 2, true, animation);
                },
            });
        }, 200);
    };

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

        setPosition({ rel: details.rel, abs: details.abs });
        setIsBeginning(!opt.loop && details.rel === details.minIdx);
        setIsEnd(!opt.loop && details.rel === details.maxIdx);
    };

    const getSlidesPerView = (options: KeenSliderOptions): number => {
        if (!options.slides || typeof options.slides !== "object") {
            return 1;
        }

        const perView = options.slides.perView;

        return typeof perView === "number" ? perView : 1;
    };

    const moveToSlide = (index: number) => {
        if (!sliderRef.current) {
            return;
        }

        sliderRef.current.moveToIdx(index);
    };

    const moveByView = (direction: "forwards" | "backwards" = "forwards") => {
        if (!sliderRef.current) {
            return;
        }

        const { track, options } = sliderRef.current;
        const details = track.details;

        const perView = getSlidesPerView(options);

        const maxAbs = details.slides.length - perView;
        const animation: KeenAnimation = {
            duration: 750,
        };

        switch (direction) {
            case "forwards":
                sliderRef.current.moveToIdx(
                    Math.min(maxAbs, details.rel + perView),
                    false,
                    animation
                );
                break;
            case "backwards":
                sliderRef.current.moveToIdx(
                    Math.max(0, Math.min(maxAbs, details.rel) - perView),
                    false,
                    animation
                );
                break;
        }
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
            disabled,
            isBeginning,
            isEnd,
            position,
            moveToSlide,
            moveByView,
            next,
            prev,
        },
    ];
};
