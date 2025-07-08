import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.log('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleResetError = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <View className="flex-1 justify-center items-center p-4 bg-white">
                    <Text className="text-lg font-bold text-red-600 mb-2">
                        An error occurred
                    </Text>
                    <Text className="text-gray-600 text-center mb-4">
                        Sorry, the application encountered an error. Please try reloading.
                    </Text>
                    {__DEV__ && this.state.error && (
                        <Text className="text-xs text-gray-400 mb-4 text-center">
                            {this.state.error.message}
                        </Text>
                    )}
                    <TouchableOpacity
                        onPress={this.handleResetError}
                        className="bg-blue-500 px-4 py-2 rounded-md"
                    >
                        <Text className="text-white font-medium">Try again</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return this.props.children;
    }
}