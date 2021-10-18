import { MutableRefObject, useEffect, useState } from "react";
import KeenSlider, { TOptions } from "keen-slider";

interface SliderData {
    mounted: boolean;
}

export const useSlider = (
    container: MutableRefObject<HTMLElement | null>,
    options: TOptions = {}
): SliderData => {
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        if (!container.current) {
            return;
        }

        const sliderRef = new KeenSlider(container.current, {
            spacing: 15,
            rubberband: false,
            loop: true,
            mounted: () => setMounted(true),
            ...options,
        });

        return () => sliderRef.destroy();
    }, []);

    return {
        mounted,
    };
};
