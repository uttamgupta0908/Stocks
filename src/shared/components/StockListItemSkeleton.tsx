import React from 'react';
import { View } from 'react-native';
import { Skeleton } from './Skeleton';

export const StockListItemSkeleton = () => {
    return (
        <View className="flex-row items-center p-4 bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700">
            {/* Circle for Logo */}
            <Skeleton width={40} height={40} borderRadius={20} />

            {/* Info */}
            <View className="flex-1 ml-3">
                <Skeleton width={60} height={16} className="mb-2" />
                <Skeleton width={120} height={12} />
            </View>

            {/* Price */}
            <View className="items-end mr-3">
                <Skeleton width={50} height={18} className="mb-2" />
                <Skeleton width={40} height={12} />
            </View>

            {/* Badge */}
            <Skeleton width={60} height={24} borderRadius={12} />
        </View>
    );
};
