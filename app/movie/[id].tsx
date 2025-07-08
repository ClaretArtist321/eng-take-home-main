import React, { useState, useEffect } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {
    View,
    Text,
    Image,
    ScrollView,
    ActivityIndicator,
    Alert,
    Pressable
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { EmptyState } from '../../components/EmptyState';
import { MovieDetails, getMovieDetails, getImageUrl } from '../../lib/tmdb';

export default function MovieDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            loadMovieDetails(parseInt(id as string));
        }
    }, [id]);

    const loadMovieDetails = async (movieId: number) => {
        try {
            setLoading(true);
            const movieData = await getMovieDetails(movieId);
            setMovie(movieData);
        } catch (error) {
            Alert.alert('Error', 'Failed to load movie details');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-gray-50">
                <Stack.Screen options={{ title: 'Movie Details' }} />
                <LoadingSpinner text="Loading movie details..." />
            </SafeAreaView>
        );
    }

    if (!movie) {
        return (
            <SafeAreaView className="flex-1 bg-gray-50">
                <Stack.Screen options={{ title: 'Movie Details' }} />
                <EmptyState
                    title="Movie not found"
                    message="Please go back and search again"
                    icon="😔"
                />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <Stack.Screen options={{ title: movie.title }} />

            <ScrollView className="flex-1">
                {/* Movie poster and basic information */}
                <View className="bg-white mb-4">
                    <View className="relative">
                        <Image
                            source={{
                                uri: getImageUrl(movie.backdrop_path) || 'https://via.placeholder.com/400x225?text=No+Image'
                            }}
                            className="w-full h-48"
                            resizeMode="cover"
                        />
                        <View className="absolute inset-0 bg-black/30" />
                    </View>

                    <View className="p-4">
                        <View className="flex-row">
                            <Image
                                source={{
                                    uri: getImageUrl(movie.poster_path) || 'https://via.placeholder.com/150x225?text=No+Image'
                                }}
                                className="w-24 h-36 rounded-lg -mt-8 border-2 border-white"
                                resizeMode="cover"
                            />
                            <View className="flex-1 ml-4">
                                <Text className="text-xl font-bold text-gray-800 mb-2">
                                    {movie.title}
                                </Text>
                                <View className="flex-row items-center mb-2">
                                    <Text className="text-sm text-yellow-600 font-semibold">
                                        ⭐ {movie.vote_average.toFixed(1)}
                                    </Text>
                                    <Text className="text-sm text-gray-500 ml-2">
                                        ({movie.vote_count} votes)
                                    </Text>
                                </View>
                                <Text className="text-sm text-gray-600 mb-1">
                                    {movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown year'}
                                </Text>
                                {movie.runtime && (
                                    <Text className="text-sm text-gray-600">
                                        {movie.runtime} minutes
                                    </Text>
                                )}
                            </View>
                        </View>
                    </View>
                </View>

                {/* Genre tags */}
                {movie.genres && movie.genres.length > 0 && (
                    <View className="bg-white mb-4 p-4">
                        <Text className="text-lg font-semibold mb-2 text-gray-800">Genres</Text>
                        <View className="flex-row flex-wrap">
                            {movie.genres.map((genre) => (
                                <View key={genre.id} className="bg-blue-100 rounded-full px-3 py-1 mr-2 mb-2">
                                    <Text className="text-sm text-blue-800">{genre.name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Overview */}
                {movie.overview && (
                    <View className="bg-white mb-4 p-4">
                        <Text className="text-lg font-semibold mb-2 text-gray-800">Overview</Text>
                        <Text className="text-gray-700 leading-6">{movie.overview}</Text>
                    </View>
                )}

                {/* Tagline */}
                {movie.tagline && (
                    <View className="bg-white mb-4 p-4">
                        <Text className="text-lg font-semibold mb-2 text-gray-800">Tagline</Text>
                        <Text className="text-gray-700 italic">{movie.tagline}</Text>
                    </View>
                )}

                {/* Production Info */}
                <View className="bg-white mb-4 p-4">
                    <Text className="text-lg font-semibold mb-2 text-gray-800">Production Info</Text>
                    <View className="space-y-2">
                        <View className="flex-row">
                            <Text className="text-sm text-gray-600 w-20">Status:</Text>
                            <Text className="text-sm text-gray-800">{movie.status}</Text>
                        </View>
                        <View className="flex-row">
                            <Text className="text-sm text-gray-600 w-20">Language:</Text>
                            <Text className="text-sm text-gray-800">{movie.original_language}</Text>
                        </View>
                        {movie.budget > 0 && (
                            <View className="flex-row">
                                <Text className="text-sm text-gray-600 w-20">Budget:</Text>
                                <Text className="text-sm text-gray-800">${movie.budget.toLocaleString()}</Text>
                            </View>
                        )}
                        {movie.revenue > 0 && (
                            <View className="flex-row">
                                <Text className="text-sm text-gray-600 w-20">Revenue:</Text>
                                <Text className="text-sm text-gray-800">${movie.revenue.toLocaleString()}</Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* Production Companies */}
                {movie.production_companies && movie.production_companies.length > 0 && (
                    <View className="bg-white mb-4 p-4">
                        <Text className="text-lg font-semibold mb-2 text-gray-800">Production Companies</Text>
                        <View className="space-y-1">
                            {movie.production_companies.map((company, index) => (
                                <Text key={index} className="text-sm text-gray-700">
                                    • {company.name}
                                </Text>
                            ))}
                        </View>
                    </View>
                )}

                {/* Back button */}
                <View className="px-4 pb-4">
                    <Pressable
                        onPress={() => router.back()}
                        className="bg-blue-600 py-3 rounded-lg"
                    >
                        <Text className="text-white text-center font-semibold">Back to Search</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}