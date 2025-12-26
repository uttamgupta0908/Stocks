import React from 'react';
import { View } from 'react-native';
import { Skeleton } from '../../../shared/components/Skeleton';

export const StatisticsCardSkeleton = () => {
    return (
        <View className="bg-gray-100 dark:bg-slate-800 rounded-2xl p-4 mr-3 w-32 border border-transparent dark:border-slate-700">
            <View className="mb-2">
                <Skeleton width={28} height={28} borderRadius={14} />
            </View>
            <Skeleton width={80} height={24} className="mb-2" />
            <Skeleton width={60} height={12} className="mb-2" />
            <Skeleton width={40} height={12} />
        </View>
    );
};
