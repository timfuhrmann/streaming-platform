import { useEffect, useRef } from "react";

export const useFocus = (focused: boolean) => {
    const ref = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (focused && ref.current) {
            ref.current.focus();
        }
    }, [focused]);

    return ref;
};
