import React from 'react';
import { View, Text } from 'react-native';

interface EmptyStateProps {
    title: string;
    message: string;
    icon?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    message,
    icon = '🎬'
}) => {
    return (
        <View className="flex-1 justify-center items-center py-8">
            <Text className="text-6xl mb-4">{icon}</Text>
            <Text className="text-lg font-semibold text-gray-800 mb-2">{title}</Text>
            <Text className="text-gray-500 text-center">{message}</Text>
        </View>
    );
};