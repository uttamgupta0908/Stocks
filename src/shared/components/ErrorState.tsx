import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';

interface ErrorStateProps {
    message?: string;
    onRetry?: () => void;
    fullScreen?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
    message = 'Something went wrong while fetching data.',
    onRetry,
    fullScreen = true
}) => {
    return (
        <View className={`${fullScreen ? 'flex-1' : 'py-8'} justify-center items-center px-6 bg-background dark:bg-slate-900`}>
            <View className="bg-danger-50 dark:bg-danger-900/20 p-4 rounded-full mb-4">
                <AlertTriangle size={32} color="#EF4444" />
            </View>
            <Text className="text-slate-900 dark:text-white text-xl font-bold mb-2 text-center">
                Oops!
            </Text>
            <Text className="text-slate-500 dark:text-slate-400 text-center mb-6 leading-6">
                {message}
            </Text>
            {onRetry && (
                <TouchableOpacity
                    onPress={onRetry}
                    className="bg-primary px-8 py-3 rounded-xl shadow-sm"
                    activeOpacity={0.8}
                >
                    <Text className="text-white font-bold text-base">Try Again</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};
