import { useEffect, useRef } from "react";

export const REGEX_DIGITS = /[0-9]/;

export const KEY_CODES = {
    BACKSPACE: "Backspace",
};

export const useFocus = (focused: boolean) => {
    const ref = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (focused && ref.current) {
            ref.current.focus();
        }
    }, [focused]);

    return ref;
};
