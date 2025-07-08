import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Movie, getImageUrl } from '../lib/tmdb';

interface MovieCardProps {
    movie: Movie;
    onPress: (movie: Movie) => void;
}

/**
 * MovieCard component for displaying movie information in search results
 * @param movie
 * @param onPress
 * @constructor
 */
export const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress }) => {
    const posterUrl = getImageUrl(movie.poster_path);
    const backdropUrl = getImageUrl(movie.backdrop_path);

    /**
     * Format release date for display
     */
    const formatReleaseDate = (dateString: string): string => {
        if (!dateString) return 'Unknown year';
        const date = new Date(dateString);
        return date.getFullYear().toString();
    };

    /**
     * Format rating for display
     */
    const formatRating = (rating: number): string => {
        return rating.toFixed(1);
    };

    /**
     * Format vote count for display
     */
    const formatVoteCount = (count: number): string => {
        return count + ' votes';
    };

    return (
        <TouchableOpacity
            className="bg-white rounded-xl shadow-md mx-6 mb-4 overflow-hidden"
            onPress={() => onPress(movie)}
            activeOpacity={0.8}
        >
            {/* Background image section */}
            <View className="relative">
                <Image
                    source={{
                        uri: backdropUrl || posterUrl || 'https://via.placeholder.com/400x200?text=No+Image'
                    }}
                    className="w-full h-40"
                    resizeMode="cover"
                />
                <View className="absolute inset-0 bg-black/40" />
            </View>

            {/* Content section */}
            <View className="p-4">
                <View className="flex-row">
                    {/* Movie poster */}
                    <Image
                        source={{
                            uri: posterUrl || 'https://via.placeholder.com/120x180?text=No+Image'
                        }}
                        className="w-24 h-36 rounded-lg -mt-12 border-2 border-white shadow-lg"
                        resizeMode="cover"
                    />

                    {/* Movie info */}
                    <View className="flex-1 ml-4 mt-2">
                        <Text className="text-lg font-bold text-gray-800 mb-1" numberOfLines={2}>
                            {movie.title}
                        </Text>

                        <Text className="text-sm text-gray-600 mb-2">
                            {formatReleaseDate(movie.release_date)}
                        </Text>


                        {/* Rating and votes */}
                        <View className="flex-row items-center">
                            <Text className="text-sm text-yellow-600 font-semibold">
                                ⭐ {formatRating(movie.vote_average)}
                            </Text>
                            <Text className="text-sm text-gray-500 ml-2">
                                ({formatVoteCount(movie.vote_count)})
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Overview */}
                {movie.overview && (
                    <Text className="text-sm text-gray-600 leading-5 mt-3" numberOfLines={3}>
                        {movie.overview}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    )
};

export default MovieCard;
