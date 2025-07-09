## Citro take-home test

This is a blank React Native (Expo) project. Your task is to implement a movie search application using TMDB or any other similar apis.
Feel free to use any libraries as you see fit, UI or otherwise (state management, data fetching, etc).

Expo-router and Nativewind are already installed and configured. If this is not your preference, feel free to use a different navigation library or styling solution as you see fit.

Please spend no more than a couple hours on this. Designs need not be polished, a basic wireframe-like UI is sufficient.

### Requirements
- Customers should be able to search for movies by title
- Search result list should display metadata for each movie
- clicking on a movie should display the details about that movie
    - this can be in as a modal or a separate details screen 



# Movie Search App

A React Native (Expo) movie search application that provides rich movie information and search functionality using the TMDB API.

## Features

### Core Functionality
- Movie Search: Search for movies by title
- Popular Movies: Display current popular movies on the home page
- Movie Details: Click on movie cards to view detailed information
- Responsive Design: Support for mobile and web platforms

### User Interface
- Modern UI: Built with NativeWind (Tailwind CSS) for beautiful interfaces
- Movie Cards: Display movie posters, titles, ratings, years, and other key information
- Detail Pages: Include complete movie information such as plot summaries, genres, production companies, etc.
- Loading States: Elegant loading animations and empty state prompts
- Error Handling: Friendly error messages and network exception handling

### Technical Features
- TypeScript: Complete type safety
- Test-Driven Development: Using Jest and React Native Testing Library
- Code Quality: ESLint and Prettier code formatting
- Routing Management: Expo Router file system routing

## Tech Stack

### Frontend Framework
- React Native: Cross-platform mobile app development
- Expo: Development toolchain and platform services
- TypeScript: Type-safe JavaScript

### Styling and UI
- NativeWind: Tailwind CSS implementation for React Native
- React Native Safe Area Context: Safe area handling

### Navigation and Routing
- Expo Router: File system-based routing solution

### Data Fetching
- TMDB API: The Movie Database API for movie data
- Fetch API: Native network requests

### Testing
- Jest: JavaScript testing framework
- React Native Testing Library: React Native component testing
- @testing-library/jest-native: Jest native matchers

### Development Tools
- ESLint: Code quality checking
- Prettier: Code formatting
- Babel: JavaScript compiler

## Installation and Setup

### Requirements
- Node.js (recommended v18 or higher)
- npm or yarn


### Installation Steps

1. **Clone the project**
   ```bash
   git clone <repository-url>
   cd eng-take-home-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment configuration**
   
   Create a `.env` file and add TMDB API configuration:
   ```env
   EXPO_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
   EXPO_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
   EXPO_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
   ```

   > **Get TMDB API Key**: Visit [TMDB website](https://www.themoviedb.org/settings/api) to register and apply for an API Key

4. **Start development server**
   ```bash
   npm start
   ```

### Running on Different Platforms

- Web: `npm run web`
- iOS: `npm run ios` (requires macOS and Xcode)
- Android: `npm run android` (requires Android Studio)

## Testing

### Running Tests
```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Structure
```
_tests_/
├── app/                 # Page component tests
│   ├── index.test.tsx   # Home page tests
│   └── movie/
│       └── [id].test.tsx # Movie detail page tests
├── components/          # Component tests
│   ├── EmptyState.test.tsx
│   ├── LoadingSpinner.test.tsx
│   └── MovieCard.test.tsx
└── utils/              # Utility function tests
    └── test-utils.tsx
```

## Project Structure

```
eng-take-home-main/
├── app/                    # Expo Router pages
│   ├── _layout.tsx        # Root layout
│   ├── index.tsx          # Home page (movie search)
│   └── movie/
│       └── [id].tsx       # Movie detail page
├── components/            # Reusable components
│   ├── Container.tsx      # Container component
│   ├── EmptyState.tsx     # Empty state component
│   ├── ErrorBoundary.tsx  # Error boundary
│   ├── LoadingSpinner.tsx # Loading animation
│   └── MovieCard.tsx      # Movie card component
├── lib/                   # Utility libraries
│   ├── config.ts          # Application configuration
│   └── tmdb.ts           # TMDB API interface
├── _tests_/              # Test files
├── assets/               # Static assets
└── Configuration files...
```

## Main Components

### MovieCard
Movie card component that displays basic movie information:
- Movie poster and background image
- Title, year, rating
- Vote count
- Plot summary

### MovieDetailScreen
Movie detail page containing:
- Complete movie information
- Genre tags
- Production company information
- Budget and revenue data

### LoadingSpinner & EmptyState
User experience components:
- Loading animations
- Empty state prompts
- Error state handling

## API Integration

### TMDB API Features
- Search Movies: `searchMovies(query)`
- Get Popular Movies: `getPopularMovies()`
- Get Movie Details: `getMovieDetails(movieId)`
- Image URL Processing: `getImageUrl(path)`

### Error Handling
- Network request exception handling
- API response error handling
- User-friendly error messages


