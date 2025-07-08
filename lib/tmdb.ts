// TMDB API configuration
import {config} from "./config";

const API_KEY = config.TMDB_API_KEY;
const BASE_URL = config.TMDB_BASE_URL;
const IMAGE_BASE_URL = config.TMDB_IMAGE_BASE_URL;

// Safe fetch function
const safeFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
        return response;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
    adult: boolean;//
    original_language: string;
    popularity: number;
}

export interface MovieDetails extends Movie {
    genres: { id: number; name: string }[];
    runtime: number;
    budget: number;
    revenue: number;
    homepage: string;
    imdb_id: string;
    production_companies: { id: number; name: string; logo_path: string }[];
    production_countries: { iso_3166_1: string; name: string }[];
    spoken_languages: { iso_639_1: string; name: string }[];
    status: string;
    tagline: string;
}

export interface SearchResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

// Search movies
export const searchMovies = async (query: string, page: number = 1): Promise<SearchResponse> => {
    try {
        const response = await safeFetch(
            `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}&language=${config.DEFAULT_LANGUAGE}`,
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json();
        return data;

    }catch(error) {
        console.error('Error searching movies:', error);
        throw error;
    }
};

// Get movie details
export const getMovieDetails = async (movieId: number): Promise<MovieDetails> => {
    try {
        const response = await safeFetch(
            `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=${config.DEFAULT_LANGUAGE}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    }   catch (error) {
        console.error('Error getting movie details:', error);
        throw error;
    }
};

// Get full image URL
export const getImageUrl = (path: string): string => {
    return path ? `${IMAGE_BASE_URL}${path}` : '';
};

// Get popular movies
export const getPopularMovies = async (page: number = 1): Promise<SearchResponse> => {
    try {
        const response = await safeFetch(
            `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}&language=${config.DEFAULT_LANGUAGE}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting popular movies:', error);
        throw error;
    }
};
