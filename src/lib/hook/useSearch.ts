import debounce from "lodash.debounce";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { getShowByString } from "@lib/api/tmdb";

export const useSearch = () => {
    const inputFocusRef = useRef<HTMLInputElement | null>(null);
    const [, startTransition] = useTransition();
    const [suggestions, setSuggestions] = useState<Api.TV[]>([]);

    useEffect(() => {
        if (!inputFocusRef.current) {
            return;
        }

        inputFocusRef.current.focus();
    }, []);

    const handleQuery = async (value: string) => {
        if (!value) {
            setSuggestions([]);
            return;
        }

        const res = await getShowByString(value);
        startTransition(() => setSuggestions(res));
    };

    const handleInput = useCallback(debounce(handleQuery, 150), []);

    return { inputFocusRef, suggestions, handleInput };
};
