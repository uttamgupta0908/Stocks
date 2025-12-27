import React from 'react';
import { View } from 'react-native';
import { Skeleton } from '../../../shared/components/Skeleton';

export const ProductStatsSkeleton = () => {
    return (
        <View className="bg-white dark:bg-slate-800 p-4 mt-2 border-y border-gray-100 dark:border-slate-700">
            <Skeleton width={120} height={22} className="mb-4" />
            <View className="flex-row flex-wrap justify-between">
                {[1, 2, 3, 4].map((i) => (
                    <View key={i} className="w-[48%] mb-4 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-2xl">
                        <Skeleton width={60} height={12} className="mb-2" />
                        <Skeleton width={80} height={24} />
                    </View>
                ))}
            </View>
        </View>
    );
};

