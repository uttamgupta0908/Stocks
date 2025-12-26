import React from 'react';
import { View, Text } from 'react-native';

interface PercentageBadgeProps {
    percentage: number | string;
    size?: 'small' | 'medium';
}

const sizeClasses = {
    small: 'px-2 py-0.5',
    medium: 'px-3 py-1',
};

const textSizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
};

export const PercentageBadge: React.FC<PercentageBadgeProps> = ({
    percentage,
    size = 'medium'
}) => {
    const numValue = typeof percentage === 'string'
        ? parseFloat(percentage.replace('%', ''))
        : percentage;

    const isPositive = numValue >= 0;
    const bgColor = isPositive ? 'bg-success' : 'bg-danger';
    const displayValue = typeof percentage === 'string'
        ? percentage
        : `${isPositive ? '+' : ''}${numValue.toFixed(2)}%`;

    return (
        <View className={`${bgColor} ${sizeClasses[size]} rounded-full`}>
            <Text className={`${textSizeClasses[size]} font-semibold text-white`}>
                {displayValue}
            </Text>
        </View>
    );
};
