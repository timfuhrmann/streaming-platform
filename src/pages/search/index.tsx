import React, { useCallback, useEffect, useRef, useState, useTransition } from "react";
import styled from "styled-components";
import debounce from "lodash.debounce";
import { aspectRatio, fillParent } from "@css/helper";
import { SearchInput } from "../../layout/shared/SearchInput";
import { getShowByString } from "@lib/api/tmdb";
import { Card } from "../../layout/shared/card/Card";
import { useWatchlist } from "@lib/watchlist/context/WatchlistContext";
import { content } from "@css/helper/content";

const SearchWrapper = styled.div`
    ${content()};
    padding: calc(12.5rem - ${p => p.theme.navigationHeight}) 0 12.5rem;
`;

const SearchResults = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: -0.5rem;
    padding-top: 2rem;
`;

const SearchInputWrapper = styled.div`
    position: sticky;
    z-index: 1;
    top: 0;
    background-color: ${p => p.theme.gray50};
    padding-top: ${p => p.theme.navigationHeight};
`;

const SearchCardWrapper = styled.div`
    flex: 1 1 calc(50% - 1rem);
    max-width: calc(50% - 1rem);
    margin: 0.5rem;
    ${aspectRatio(1.5)};

    ${p => p.theme.breakpoints.min("m")} {
        flex: 1 1 calc(25% - 1rem);
        max-width: calc(25% - 1rem);
    }

    ${p => p.theme.breakpoints.min("l")} {
        flex: 1 1 calc(20% - 1rem);
        max-width: calc(20% - 1rem);
    }
`;

const SearchCard = styled.div`
    ${fillParent};
`;

const Search: React.FC = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [, startTransition] = useTransition();
    const [suggestions, setSuggestions] = useState<Api.TV[]>([]);
    const { hasShowProgress, isShowActive, addShowToWatchlist } = useWatchlist();

    useEffect(() => {
        if (!inputRef.current) {
            return;
        }

        inputRef.current.focus();
    }, []);

    const handleQuery = async (value: string) => {
        if (!value) {
            setSuggestions([]);
            return;
        }

        const res = await getShowByString(value);
        startTransition(() => setSuggestions(res));
    };

    const debouncedFunc = useCallback(debounce(handleQuery, 150), []);

    return (
        <SearchWrapper>
            <SearchInputWrapper>
                <SearchInput
                    ref={inputRef}
                    placeholder="What are you looking for?"
                    onInput={debouncedFunc}
                />
            </SearchInputWrapper>
            <SearchResults>
                {suggestions.map(suggestion => (
                    <SearchCardWrapper key={suggestion.id}>
                        <SearchCard>
                            <Card
                                {...suggestion}
                                progress={hasShowProgress(suggestion.id)}
                                watchlistActive={isShowActive(suggestion.id)}
                                onWatchlist={() => addShowToWatchlist(suggestion)}
                            />
                        </SearchCard>
                    </SearchCardWrapper>
                ))}
            </SearchResults>
        </SearchWrapper>
    );
};

export default Search;
