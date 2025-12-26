import React from 'react';
import { View, Text } from 'react-native';
import { Inbox } from 'lucide-react-native';

interface EmptyStateProps {
    title?: string;
    message?: string;
    fullScreen?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    title = 'No Results Found',
    message = 'Try searching with different keywords or check back later.',
    fullScreen = true
}) => {
    return (
        <View className={`${fullScreen ? 'flex-1' : 'py-8'} justify-center items-center px-8 bg-background dark:bg-slate-900`}>
            <View className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full mb-4">
                <Inbox size={40} color="#94A3B8" />
            </View>
            <Text className="text-slate-900 dark:text-white text-xl font-bold mb-2">
                {title}
            </Text>
            <Text className="text-slate-500 dark:text-slate-400 text-center leading-6">
                {message}
            </Text>
        </View>
    );
};
