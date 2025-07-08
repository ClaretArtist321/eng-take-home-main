import React from 'react';
import {ActivityIndicator, View, Text} from "react-native";

interface LoadingSpinnerProps {
    text?: string;
    size?: 'small' | 'large';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    text = 'Loading...',
    size = 'large'
}) => {
    return (
        <View className="flex-1 justify-center items-center">
            <ActivityIndicator size={size} color="#3B82F6" />
            <Text className="mt-2 text-gray-600">{text}</Text>
        </View>
    );
};
