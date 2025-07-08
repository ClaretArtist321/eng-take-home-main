import React from 'react';
import MovieCard from '../../components/MovieCard';
import { render, fireEvent } from '../utils/test-utils';
import { mockMovieData } from '../utils/test-utils';
import { Movie } from '../../lib/tmdb';

// Mock tmdb module
jest.mock('../../lib/tmdb', () => ({
    getImageUrl: jest.fn((path) => path ? `https://image.tmdb.org/t/p/w500${path}` : ''),
}));

describe('MovieCard', () => {
    const mockOnPress = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders movie information correctly', () => {
        const { getByText } = render(
            <MovieCard movie={mockMovieData} onPress={mockOnPress} />
        );

        expect(getByText('Fight Club')).toBeTruthy();
        expect(getByText('1999')).toBeTruthy();
        expect(getByText('⭐ 8.4')).toBeTruthy();
        expect(getByText('(26280 votes)')).toBeTruthy();
        expect(getByText(mockMovieData.overview)).toBeTruthy();
    });

    it('calls onPress when card is touched', () => {
        const { getByText } = render(
            <MovieCard movie={mockMovieData} onPress={mockOnPress} />
        );

        const card = getByText('Fight Club');
        fireEvent.press(card);

        expect(mockOnPress).toHaveBeenCalledWith(mockMovieData);
        expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    it('formats release date correctly', () => {
        const movieWithDate = {
            ...mockMovieData,
            release_date: '2023-05-15'
        };

        const { getByText } = render(
            <MovieCard movie={movieWithDate} onPress={mockOnPress} />
        );

        expect(getByText('2023')).toBeTruthy();
    });

    it('formats rating correctly', () => {
        const movieWithRating = {
            ...mockMovieData,
            vote_average: 7.89
        };

        const { getByText } = render(
            <MovieCard movie={movieWithRating} onPress={mockOnPress} />
        );

        expect(getByText('⭐ 7.9')).toBeTruthy();
    });

    it('formats vote count correctly for large numbers', () => {
        const movieWithLargeVotes = {
            ...mockMovieData,
            vote_count: 15420
        };

        const { getByText } = render(
            <MovieCard movie={movieWithLargeVotes} onPress={mockOnPress} />
        );

        expect(getByText('(15420 votes)')).toBeTruthy();
    });

    it('formats vote count correctly for small numbers', () => {
        const movieWithSmallVotes = {
            ...mockMovieData,
            vote_count: 500
        };

        const { getByText } = render(
            <MovieCard movie={movieWithSmallVotes} onPress={mockOnPress} />
        );

        expect(getByText('(500 votes)')).toBeTruthy();
    });

    it('handles missing poster and backdrop paths', () => {
        const movieWithoutImages = {
            ...mockMovieData,
            poster_path: '',
            backdrop_path: ''
        } as Movie;

        expect(() => render(
            <MovieCard movie={movieWithoutImages} onPress={mockOnPress} />
        )).not.toThrow();
    });

    it('handles empty release date', () => {
        const movieWithoutDate = {
            ...mockMovieData,
            release_date: ''
        };

        const { getByText } = render(
            <MovieCard movie={movieWithoutDate} onPress={mockOnPress} />
        );

        expect(getByText('Unknown year')).toBeTruthy();
    });

    it('handles missing release date', () => {
        const movieWithoutDate = {
            ...mockMovieData,
            release_date: ''
        } as Movie;

        const { getByText } = render(
            <MovieCard movie={movieWithoutDate} onPress={mockOnPress} />
        );

        expect(getByText('Unknown year')).toBeTruthy();
    });

    it('handles very long title', () => {
        const movieWithLongTitle = {
            ...mockMovieData,
            title: 'This is a very long movie title that should be truncated properly in the UI'
        };

        const { getByText } = render(
            <MovieCard movie={movieWithLongTitle} onPress={mockOnPress} />
        );

        expect(getByText(movieWithLongTitle.title)).toBeTruthy();
    });

    it('handles movie without overview', () => {
        const movieWithoutOverview = {
            ...mockMovieData,
            overview: ''
        };

        const { queryByText } = render(
            <MovieCard movie={movieWithoutOverview} onPress={mockOnPress} />
        );

        // Overview should not be rendered when empty
        expect(queryByText(mockMovieData.overview)).toBeNull();
    });

    it('handles zero vote count', () => {
        const movieWithZeroVotes = {
            ...mockMovieData,
            vote_count: 0
        };

        const { getByText } = render(
            <MovieCard movie={movieWithZeroVotes} onPress={mockOnPress} />
        );

        expect(getByText('(0 votes)')).toBeTruthy();
    });

    it('handles zero rating', () => {
        const movieWithZeroRating = {
            ...mockMovieData,
            vote_average: 0
        };

        const { getByText } = render(
            <MovieCard movie={movieWithZeroRating} onPress={mockOnPress} />
        );

        expect(getByText('⭐ 0.0')).toBeTruthy();
    });

    it('displays star icon correctly', () => {
        const { getByText } = render(
            <MovieCard movie={mockMovieData} onPress={mockOnPress} />
        );

        expect(getByText('⭐ 8.4')).toBeTruthy();
    });

    it('handles card press with different movies', () => {
        const movie1 = { ...mockMovieData, id: 1, title: 'Movie 1' };
        const movie2 = { ...mockMovieData, id: 2, title: 'Movie 2' };

        const { getByText, rerender } = render(
            <MovieCard movie={movie1} onPress={mockOnPress} />
        );

        fireEvent.press(getByText('Movie 1'));
        expect(mockOnPress).toHaveBeenCalledWith(movie1);

        rerender(<MovieCard movie={movie2} onPress={mockOnPress} />);
        fireEvent.press(getByText('Movie 2'));
        expect(mockOnPress).toHaveBeenCalledWith(movie2);

        expect(mockOnPress).toHaveBeenCalledTimes(2);
    });

    it('uses backdrop image when available', () => {
        const movieWithBackdrop = {
            ...mockMovieData,
            backdrop_path: '/backdrop.jpg'
        };

        expect(() => render(
            <MovieCard movie={movieWithBackdrop} onPress={mockOnPress} />
        )).not.toThrow();
    });

    it('falls back to poster when backdrop is not available', () => {
        const movieWithoutBackdrop = {
            ...mockMovieData,
            backdrop_path: ''
        } as Movie;

        expect(() => render(
            <MovieCard movie={movieWithoutBackdrop} onPress={mockOnPress} />
        )).not.toThrow();
    });
});