import React from 'react';
import { View } from 'react-native';
import { Skeleton } from './Skeleton';

export const StockCardSkeleton = () => {
    return (
        <View className="bg-white dark:bg-slate-800 rounded-2xl p-4 w-[160px] mr-3 shadow-sm border border-transparent dark:border-slate-700">
            {/* Circle for Logo and Name */}
            <View className="flex-row items-center mb-3">
                <Skeleton width={24} height={24} borderRadius={12} />
                <Skeleton width={40} height={16} className="ml-2" />
            </View>

            {/* Price */}
            <Skeleton width={80} height={24} className="mb-3" />

            {/* Change */}
            <Skeleton width={60} height={14} className="mb-3" />

            {/* Badge */}
            <Skeleton width={70} height={24} borderRadius={8} />
        </View>
    );
};
