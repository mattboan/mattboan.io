export const genSlug = (str: string): string => {
    return str.replace(/\W+/g, '-');
};
