import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface FilterChipProps {
    label: string;
    isActive: boolean;
    onPress: () => void;
}

export const FilterChip: React.FC<FilterChipProps> = ({ label, isActive, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`px-4 py-2 rounded-full mr-2 ${isActive ? 'bg-primary' : 'bg-gray-100 dark:bg-slate-700'
                }`}
            activeOpacity={0.7}
        >
            <Text
                className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-gray-700 dark:text-slate-300'
                    }`}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
};
