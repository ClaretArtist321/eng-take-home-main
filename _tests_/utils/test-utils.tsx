import React from 'react';
// @ts-ignore
import { render, RenderOptions } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Mock data for testing
export const mockMovieData = {
    id: 550,
    title: 'Fight Club',
    original_title: 'Fight Club',
    overview: 'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.',
    poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    backdrop_path: '/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg',
    release_date: '1999-10-15',
    vote_average: 8.433,
    vote_count: 26280,
    genre_ids: [18, 53, 35],
    genres: [
        { id: 18, name: 'Drama' },
        { id: 53, name: 'Thriller' },
        { id: 35, name: 'Comedy' }
    ],
    adult: false,
    original_language: 'en',
    popularity: 123.456,
    runtime: 139,
    budget: 63000000,
    revenue: 100853753,
    status: 'Released',
    tagline: 'Mischief. Mayhem. Soap.',
    homepage: 'http://www.foxmovies.com/movies/fight-club',
    production_companies: [
        {
            id: 508,
            name: 'Regency Enterprises',
            logo_path: '/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png',
            origin_country: 'US'
        }
    ],
    spoken_languages: [
        {
            english_name: 'English',
            iso_639_1: 'en',
            name: 'English'
        }
    ]
};

export const mockMovieList = {
    page: 1,
    results: [
        mockMovieData,
        {
            id: 238,
            title: 'The Godfather',
            original_title: 'The Godfather',
            overview: 'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family.',
            poster_path: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
            backdrop_path: '/tmU7GeKVybMWFButWEGl2M4GeiP.jpg',
            release_date: '1972-03-14',
            vote_average: 8.7,
            vote_count: 18810,
            genre_ids: [18, 80],
            adult: false,
            original_language: 'en',
            popularity: 567.890
        }
    ],
    total_pages: 1,
    total_results: 2
};

// Mock API responses
export const mockApiResponses = {
    searchMovies: mockMovieList,
    popularMovies: mockMovieList,
    movieDetails: mockMovieData,
    error: {
        status_code: 34,
        status_message: 'The resource you requested could not be found.'
    }
};

// Custom render function that includes providers
const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return React.createElement(React.Fragment, {}, children);
};

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
    render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from '@testing-library/react-native';
export { customRender as render };

export const createMockFetch = (response: any, ok = true) => {
    return jest.fn().mockResolvedValue({
        ok,
        json: jest.fn().mockResolvedValue(response),
        status: ok ? 200 : 404,
        statusText: ok ? 'OK' : 'Not Found'
    });
};