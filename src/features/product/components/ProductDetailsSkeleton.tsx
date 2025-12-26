import React from 'react';
import { ScrollView, View, Dimensions } from 'react-native';
import { Skeleton } from '../../../shared/components/Skeleton';

const { width } = Dimensions.get('window');

export const ProductDetailsSkeleton = () => {
    return (
        <ScrollView className="flex-1 bg-background dark:bg-slate-900" showsVerticalScrollIndicator={false}>
            {/* Header Info */}
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

            {/* Chart Section */}
            <View className="bg-white dark:bg-slate-800 p-4 mt-2 border-y border-gray-100 dark:border-slate-700">
                <View className="flex-row mb-6">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} width={40} height={32} borderRadius={16} className="mr-2" />
                    ))}
                </View>
                <Skeleton width={width - 32} height={220} borderRadius={16} />
            </View>

            {/* Key Statistics */}
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

            {/* About */}
            <View className="bg-white dark:bg-slate-800 p-4 mt-2 border-y border-gray-100 dark:border-slate-700">
                <Skeleton width={130} height={22} className="mb-3" />
                <Skeleton width="100%" height={14} className="mb-2" />
                <Skeleton width="100%" height={14} className="mb-2" />
                <Skeleton width="80%" height={14} className="mb-4" />
                <Skeleton width={50} height={12} className="mb-1" />
                <Skeleton width={150} height={14} />
            </View>
        </ScrollView>
    );
};
