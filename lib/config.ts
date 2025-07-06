//Application configuration
import * as process from "node:process";

export const config = {
    TMDB_API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY,
    TMDB_BASE_URL: process.env.EXPO_PUBLIC_TMDB_BASE_URL,
    TMDB_IMAGE_BASE_URL: process.env.EXPO_PUBLIC_TMDB_IMAGE_BASE_URL,

    APP_NAME: 'Movie Search',
    MOVIES_PER_PAGE: 20,
    DEFAULT_LANGUAGE: 'en-US',

}