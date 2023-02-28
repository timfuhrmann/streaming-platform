export const bp = {
    intrinsic: 0, // intrinsic
    s: 524, // phone
    m: 768, // tablet
    l: 1024, // small laptop
    xl: 1250, // laptop
    xxl: 1440, // desktop
};

export type Breakpoint = keyof typeof bp;

export const breakpoints = () => {
    const keys = Object.keys(bp) as Breakpoint[];

    const min = (key: Breakpoint) => {
        return `@media screen and (min-width: ${bp[key]}px)`;
    };

    const max = (key: Breakpoint) => {
        return `@media screen and (max-width: ${bp[key]}px)`;
    };

    const minMax = (start: Breakpoint, end: Breakpoint) => {
        return `@media screen and (min-width: ${bp[start]}px) and (max-width: ${bp[end]}px)`;
    };

    const only = (key: Breakpoint) => {
        if (keys.indexOf(key) + 1 < keys.length) {
            return minMax(key, keys[keys.indexOf(key) + 1]);
        }

        return min(key);
    };

    const value = (key: Breakpoint) => {
        return bp[key];
    };

    return {
        bp,
        keys,
        min,
        max,
        minMax,
        only,
        value,
    };
};
