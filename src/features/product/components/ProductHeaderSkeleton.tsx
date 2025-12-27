import React from 'react';
import { View } from 'react-native';
import { Skeleton } from '../../../shared/components/Skeleton';

export const ProductHeaderSkeleton = () => {
    return (
        <View className="bg-white dark:bg-slate-800 p-4 border-b border-gray-100 dark:border-slate-700">
            <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                    <Skeleton width={48} height={48} borderRadius={24} />
                    <View className="ml-3">
                        <Skeleton width={60} height={24} className="mb-2" />
                        <Skeleton width={150} height={14} />
                    </View>
                </View>
                <Skeleton width={40} height={40} borderRadius={20} />
            </View>

            {/* Price */}
            <View className="mb-4">
                <Skeleton width={80} height={14} className="mb-2" />
                <View className="flex-row items-end">
                    <Skeleton width={140} height={42} className="mr-3" />
                    <View>
                        <Skeleton width={60} height={18} className="mb-1" />
                        <Skeleton width={50} height={14} />
                    </View>
                </View>
            </View>

            {/* Metrics Row */}
            <View className="flex-row justify-between mt-2">
                {[1, 2, 3, 4].map((i) => (
                    <View key={i}>
                        <Skeleton width={40} height={12} className="mb-2" />
                        <Skeleton width={60} height={16} />
                    </View>
                ))}
            </View>
        </View>
    );
};

