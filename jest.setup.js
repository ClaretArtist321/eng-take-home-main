import '@testing-library/jest-native/extend-expect';

// Mock expo modules
jest.mock('expo-constants', () => ({
    expoConfig: {
        extra: {
            apiUrl: 'https://api.example.com',
        },
    },
}));

// Mock expo/virtual/env
jest.mock('expo/virtual/env', () => ({
    env: process.env,
}));

// Note: expo-router is mocked in individual test files as needed

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
    SafeAreaProvider: ({ children }) => children,
    SafeAreaView: ({ children }) => children,
    useSafeAreaInsets: () => ({ top: 0, left: 0, right: 0, bottom: 0 }),
}));

// Mock react-native modules
// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock fetch for API tests
global.fetch = jest.fn();

// Mock react-native-css-interop moved to jest.config.js moduleNameMapper

// Silence warnings in tests
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

beforeEach(() => {
    console.warn = jest.fn();
    console.error = jest.fn();
});

afterEach(() => {
    console.warn = originalConsoleWarn;
    console.error = originalConsoleError;
    jest.clearAllMocks();
});