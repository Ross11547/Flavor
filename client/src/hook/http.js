export const http = import.meta.env.BACKEND;

export const getHttpImage = (src) => {
    if (!src) return undefined;
    return http.replace("/"+ src);
};