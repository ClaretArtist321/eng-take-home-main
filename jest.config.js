/** @type {import('jest').Config} */
module.exports = {
    preset: 'react-native',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    testMatch: [
        '**/__tests__/**/*.(test|spec).(ts|tsx|js|jsx)',
        '**/*.(test|spec).(ts|tsx|js|jsx)',
    ],
    testPathIgnorePatterns: [
        '<rootDir>/__tests__/utils/',
        '<rootDir>/node_modules/',
    ],
    collectCoverageFrom: [
        'app/**/*.{ts,tsx}',
        'components/**/*.{ts,tsx}',
        'lib/**/*.{ts,tsx}',
        '!**/__tests__/**',
        '!**/*.d.ts',
        '!**/node_modules/**',
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],
    testEnvironment: 'jsdom',
    transformIgnorePatterns: [
        'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-screens|react-native-safe-area-context|expo-.*|nativewind|react-native-css-interop)/)',
    ],
    moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/src/$1',
        '../global.css': '<rootDir>/jest.setup.js',
        '\\.(css|scss|sass)$': 'identity-obj-proxy',
        '^.+\\.(css|scss|sass)$': 'identity-obj-proxy',
    },
    globals: {
        __DEV__: true,
    },
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true,
};