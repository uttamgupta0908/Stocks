import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { LucideIcon } from 'lucide-react-native';

interface StatisticsCardProps {
    icon: LucideIcon;
    label: string;
    value: string;
    change?: string;
    backgroundColor: 'primary' | 'success' | 'warning';
}

const bgColorClasses = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
};

export const StatisticsCard: React.FC<StatisticsCardProps> = ({
    icon: Icon,
    label,
    value,
    change,
    backgroundColor,
}) => {
    return (
        <View className={`${bgColorClasses[backgroundColor]} rounded-2xl p-4 mr-3 w-32`}>
            <View className="mb-2">
                <Icon color="white" size={28} />
            </View>
            <Text className="text-white text-2xl font-bold mb-1">{value}</Text>
            <Text className="text-white/90 text-xs font-medium">{label}</Text>
            {change && (
                <Text className="text-white/80 text-xs mt-1">{change}</Text>
            )}
        </View>
    );
};
