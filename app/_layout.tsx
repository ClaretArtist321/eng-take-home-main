import { StatusBar } from 'expo-status-bar';
import '../global.css';

import { Stack } from 'expo-router';
import { ErrorBoundary } from '../components/ErrorBoundary';

export default function RootLayout() {
    return (
        <ErrorBoundary>
            <StatusBar style="auto" />
            <Stack />
        </ErrorBoundary>
    );
}
