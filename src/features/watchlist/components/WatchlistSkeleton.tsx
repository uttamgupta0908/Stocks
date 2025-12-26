import React from 'react';
import { View, ScrollView } from 'react-native';
import { StockListItemSkeleton } from '../../../shared/components/StockListItemSkeleton';
import { Skeleton } from '../../../shared/components/Skeleton';

export const WatchlistSkeleton = () => {
    return (
        <View className="flex-1 bg-background dark:bg-slate-900">
            {/* Header with Title and Subtitle */}
            <View className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
                <View className="px-4 pt-6 pb-4">
                    <Skeleton width={150} height={32} className="mb-2" />
                    <Skeleton width={200} height={14} />
                </View>

                {/* Watchlist Tabs */}
                <View className="py-3 px-4">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} width={100} height={32} borderRadius={16} className="mr-2" />
                        ))}
                    </ScrollView>
                </View>

                {/* Filter Chips */}
                <View className="pb-3 px-4">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} width={80} height={32} borderRadius={16} className="mr-2" />
                        ))}
                    </ScrollView>
                </View>
            </View>

            {/* List */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <StockListItemSkeleton key={i} />
                ))}
            </ScrollView>
        </View>
    );
};
