export const deleteParamFromQuery = (query: NodeJS.Dict<string | string[]>, selector: string) => {
    delete query[selector];
    return query;
};

export const truncateString = (str: string, length: number) => {
    if (str.length > length) {
        return str.substr(0, length) + "...";
    }

    return str;
};

export const recordArrayToRecord = (arr: Record<any, any>[]): Record<any, any> => {
    return arr.reduce((map, results) => {
        return { ...map, ...results };
    }, {});
};

export const createArray = (length: number) => {
    const arr = [];

    for (let i = 0; i < length; i++) {
        arr.push(i);
    }

    return arr;
};
