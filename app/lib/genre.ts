export const genresToString = (genres: Api.Genre[]) => {
    return genres.map(genre => genre.name).join(", ");
};
