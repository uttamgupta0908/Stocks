import React from 'react';
import { View, Dimensions } from 'react-native';
import { Skeleton } from '../../../shared/components/Skeleton';

const { width } = Dimensions.get('window');

export const ProductChartSkeleton = () => {
    return (
        <View className="bg-white dark:bg-slate-800 p-4 mt-2 border-y border-gray-100 dark:border-slate-700">
            <View className="flex-row mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} width={40} height={32} borderRadius={16} className="mr-2" />
                ))}
            </View>
            <Skeleton width={width - 32} height={220} borderRadius={16} />
        </View>
    );
};

