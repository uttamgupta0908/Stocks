import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

interface LoadingStateProps {
    message?: string;
    fullScreen?: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
    message = 'Loading...',
    fullScreen = true
}) => {
    return (
        <View className={`${fullScreen ? 'flex-1' : 'py-8'} justify-center items-center bg-background dark:bg-slate-900`}>
            <ActivityIndicator size="large" color="#6366F1" />
            <Text className="mt-4 text-slate-600 dark:text-slate-400 font-medium">
                {message}
            </Text>
        </View>
    );
};
