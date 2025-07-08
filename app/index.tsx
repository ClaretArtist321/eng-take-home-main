import React, { useState, useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { View, Text, TextInput, FlatList, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MovieCard from '../components/MovieCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';
import { Movie, searchMovies, getPopularMovies } from '../lib/tmdb';

export default function HomeScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const router = useRouter();

    // Load popular movies
    useEffect(() => {
        loadPopularMovies();
    }, []);

    const loadPopularMovies = async () => {
        try {
            setLoading(true);
            const response = await getPopularMovies();
            setMovies(response.results);
        } catch (error) {
            Alert.alert('Error', 'Failed to load popular movies');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        try {
            setLoading(true);
            setHasSearched(true);
            const response = await searchMovies(searchQuery);
            setMovies(response.results);
        } catch (error) {
            Alert.alert('Error', 'Search failed, please check your network connection');
        } finally {
            setLoading(false);
        }
    };

    const handleMoviePress = (movie: Movie) => {
        router.push({
            pathname: '/movie/[id]',
            params: { id: movie.id.toString() }
        });
    };

    const renderMovieCard = ({ item }: { item: Movie }) => (
        <MovieCard
            movie={item}
            onPress={() => handleMoviePress(item)}
        />
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <Stack.Screen options={{ title: 'Movie Search' }} />

            {/* Center container */}
            <View className="flex-1 items-center">
                <View className="w-full max-w-3xl flex-1">
                    {/* search bar */}
                    <View className="px-6 py-4">
                        <View className="bg-white rounded-xl shadow-md">
                            <TextInput
                                className="px-5 py-4 text-base"
                                placeholder="Search movies..."
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                onSubmitEditing={handleSearch}
                                returnKeyType="search"
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>
                    </View>

                    {/* content area */}
                    <View className="flex-1">
                        {loading ? (
                            <LoadingSpinner />
                        ) : (
                            <>
                                <Text className="text-xl font-bold mb-4 text-gray-800 px-6">
                                    {hasSearched ? `Search Results (${movies.length})` : 'Popular Movies'}
                                </Text>

                                <FlatList
                                    data={movies}
                                    renderItem={renderMovieCard}
                                    keyExtractor={(item) => item.id.toString()}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{ paddingBottom: 20 }}
                                    ListEmptyComponent={
                                        <EmptyState
                                            title={hasSearched ? 'No movies found' : 'No movie data'}
                                            message={hasSearched ? 'Try searching with different keywords' : 'Please try again later'}
                                            icon={hasSearched ? '🔍' : '🎬'}
                                        />
                                    }
                                />
                            </>
                        )}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
