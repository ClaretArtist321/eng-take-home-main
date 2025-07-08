import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent, waitFor } from '../utils/test-utils';
import HomeScreen from '../../app/index';
import { mockMovieList, mockApiResponses } from '../utils/test-utils';

// Create mock functions
const mockPush = jest.fn();

// Mock expo-router with simple direct mocks
jest.mock('expo-router', () => ({
  Stack: {
    Screen: () => null,
  },
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock components
jest.mock('../../components/MovieCard', () => ({
  __esModule: true,
  default: ({ movie, onPress }: { movie: any; onPress: (movie: any) => void }) => {
    const React = require('react');
    const { TouchableOpacity, Text } = require('react-native');
    return React.createElement(
      TouchableOpacity,
      { testID: `movie-card-${movie.id}`, onPress: () => onPress(movie) },
      React.createElement(Text, {}, movie.title)
    );
  },
}));

jest.mock('../../components/LoadingSpinner', () => ({
  LoadingSpinner: ({ text }: { text?: string }) => {
    const React = require('react');
    const { Text } = require('react-native');
    return React.createElement(Text, { testID: 'loading-spinner' }, text || 'Loading...');
  },
}));

jest.mock('../../components/EmptyState', () => ({
  EmptyState: ({ title, message, icon }: { title: string; message: string; icon?: string }) => {
    const React = require('react');
    const { View, Text } = require('react-native');
    return React.createElement(
      View,
      { testID: 'empty-state' },
      React.createElement(Text, { testID: 'empty-title' }, title),
      React.createElement(Text, { testID: 'empty-message' }, message),
      icon && React.createElement(Text, { testID: 'empty-icon' }, icon)
    );
  },
}));

// Mock tmdb API
jest.mock('../../lib/tmdb', () => ({
  searchMovies: jest.fn(),
  getPopularMovies: jest.fn(),
}));

// Mock Alert
jest.spyOn(Alert, 'alert').mockImplementation((title: string, message?: string) => {
  console.log('Alert:', title, message);
});

describe('HomeScreen', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    const { searchMovies, getPopularMovies } = require('../../lib/tmdb');
    
    getPopularMovies.mockResolvedValue(mockMovieList);
    searchMovies.mockResolvedValue(mockMovieList);
    
    // Clear mock function calls
    mockPush.mockClear();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('renders without crashing', () => {
    expect(() => render(<HomeScreen />)).not.toThrow();
  });

  it('loads popular movies on mount', async () => {
    const { getByText } = render(<HomeScreen />);
    const { getPopularMovies } = require('../../lib/tmdb');
    
    await waitFor(() => {
      expect(getPopularMovies).toHaveBeenCalledTimes(1);
    });
    
    // Wait for loading to complete and Popular Movies text to appear
    await waitFor(() => {
      expect(getByText('Popular Movies')).toBeTruthy();
    });
  });

  it('displays search input', () => {
    const { getByPlaceholderText } = render(<HomeScreen />);
    
    expect(getByPlaceholderText('Search movies...')).toBeTruthy();
  });

  it('handles search input change', () => {
    const { getByPlaceholderText } = render(<HomeScreen />);
    const searchInput = getByPlaceholderText('Search movies...');
    
    fireEvent.changeText(searchInput, 'Fight Club');
    expect(searchInput.props.value).toBe('Fight Club');
  });

  it('performs search when submit editing', async () => {
    const { getByPlaceholderText, getByText } = render(<HomeScreen />);
    const { searchMovies } = require('../../lib/tmdb');
    const searchInput = getByPlaceholderText('Search movies...');
    
    fireEvent.changeText(searchInput, 'Fight Club');
    fireEvent(searchInput, 'submitEditing');
    
    await waitFor(() => {
      expect(searchMovies).toHaveBeenCalledWith('Fight Club');
    });
  });

  it('shows loading spinner during API calls', async () => {
    const { getByTestId } = render(<HomeScreen />);
    
    await waitFor(() => {
      expect(getByTestId('loading-spinner')).toBeTruthy();
    });
  });

  it('displays movie cards after loading', async () => {
    const { getByTestId } = render(<HomeScreen />);
    
    await waitFor(() => {
      expect(getByTestId('movie-card-550')).toBeTruthy();
      expect(getByTestId('movie-card-238')).toBeTruthy();
    });
  });

  it('handles movie card press', async () => {
    const { getByTestId } = render(<HomeScreen />);
    
    await waitFor(() => {
      expect(getByTestId('movie-card-550')).toBeTruthy();
    });
    
    fireEvent.press(getByTestId('movie-card-550'));
    
    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/movie/[id]',
      params: { id: '550' }
    });
  });

  it('shows empty state when no movies found', async () => {
    const { searchMovies, getPopularMovies } = require('../../lib/tmdb');
    const emptyResponse = { ...mockMovieList, results: [] };
    
    searchMovies.mockResolvedValue(emptyResponse);
    getPopularMovies.mockResolvedValue(emptyResponse);
    
    const { getByTestId, getByPlaceholderText } = render(<HomeScreen />);
    const searchInput = getByPlaceholderText('Search movies...');
    
    fireEvent.changeText(searchInput, 'nonexistent movie');
    fireEvent(searchInput, 'submitEditing');
    
    await waitFor(() => {
      expect(getByTestId('empty-state')).toBeTruthy();
    });
  });

  it('handles API error for popular movies', async () => {
    const { getPopularMovies } = require('../../lib/tmdb');
    getPopularMovies.mockRejectedValue(new Error('Network error'));
    
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    
    render(<HomeScreen />);
    
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Error', 'Failed to load popular movies');
    });
    
    alertSpy.mockRestore();
  });

  it('handles API error for search', async () => {
    const { searchMovies } = require('../../lib/tmdb');
    searchMovies.mockRejectedValue(new Error('Network error'));
    
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    
    const { getByPlaceholderText } = render(<HomeScreen />);
    
    // Wait for initial load to complete
    await waitFor(() => {
      expect(getByPlaceholderText('Search movies...')).toBeTruthy();
    });
    
    const searchInput = getByPlaceholderText('Search movies...');
    
    fireEvent.changeText(searchInput, 'test');
    fireEvent(searchInput, 'submitEditing');
    
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Error', 'Search failed, please check your network connection');
    });
    
    alertSpy.mockRestore();
  });

  it('does not search with empty query', () => {
    const { searchMovies } = require('../../lib/tmdb');
    const { getByPlaceholderText } = render(<HomeScreen />);
    const searchInput = getByPlaceholderText('Search movies...');
    
    fireEvent.changeText(searchInput, '');
    fireEvent(searchInput, 'submitEditing');
    
    expect(searchMovies).not.toHaveBeenCalled();
  });

  it('does not search with whitespace-only query', () => {
    const { searchMovies } = require('../../lib/tmdb');
    const { getByPlaceholderText } = render(<HomeScreen />);
    const searchInput = getByPlaceholderText('Search movies...');
    
    fireEvent.changeText(searchInput, '   ');
    fireEvent(searchInput, 'submitEditing');
    
    expect(searchMovies).not.toHaveBeenCalled();
  });

  it('updates title after search', async () => {
    const { getByPlaceholderText, getByText } = render(<HomeScreen />);
    const searchInput = getByPlaceholderText('Search movies...');
    
    fireEvent.changeText(searchInput, 'Fight Club');
    fireEvent(searchInput, 'submitEditing');
    
    await waitFor(() => {
      expect(getByText('Search Results (2)')).toBeTruthy();
    });
  });

  it('shows correct empty state message for search', async () => {
    const { searchMovies } = require('../../lib/tmdb');
    const emptyResponse = { ...mockMovieList, results: [] };
    searchMovies.mockResolvedValue(emptyResponse);
    
    const { getByPlaceholderText, getByTestId } = render(<HomeScreen />);
    const searchInput = getByPlaceholderText('Search movies...');
    
    fireEvent.changeText(searchInput, 'nonexistent');
    fireEvent(searchInput, 'submitEditing');
    
    await waitFor(() => {
      expect(getByTestId('empty-title')).toHaveTextContent('No movies found');
      expect(getByTestId('empty-message')).toHaveTextContent('Try searching with different keywords');
      expect(getByTestId('empty-icon')).toHaveTextContent('🔍');
    });
  });

  it('shows correct empty state message for popular movies', async () => {
    const { getPopularMovies } = require('../../lib/tmdb');
    const emptyResponse = { ...mockMovieList, results: [] };
    getPopularMovies.mockResolvedValue(emptyResponse);
    
    const { getByTestId } = render(<HomeScreen />);
    
    await waitFor(() => {
      expect(getByTestId('empty-title')).toHaveTextContent('No movie data');
      expect(getByTestId('empty-message')).toHaveTextContent('Please try again later');
      expect(getByTestId('empty-icon')).toHaveTextContent('🎬');
    });
  });
}); 