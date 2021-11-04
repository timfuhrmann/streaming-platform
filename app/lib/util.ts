export const deleteParamFromQuery = (query: NodeJS.Dict<string | string[]>, selector: string) => {
    delete query[selector];
    return query;
};
