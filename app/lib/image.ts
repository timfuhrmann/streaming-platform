import { tmdbConfig } from "./api/tmdb/config";

/**
 * Get direct url to image.
 * @param {string} imagePath The image uri returned from the public api.
 * @param {Api.ImageSize} size The image size which should be returned by the url.
 */
export const _posterUrl = (imagePath: string, size: Api.ImageSize = "w500") => {
    return `${tmdbConfig.imageHost}/${size}${imagePath}`;
};
