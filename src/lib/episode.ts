export const hasEpisodeAired = (airDate: string): boolean => {
    return Date.now() > Date.parse(airDate);
};
