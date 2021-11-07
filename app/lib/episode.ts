export const _hasAired = (airDate: string): boolean => {
    return Date.now() > Date.parse(airDate);
};
