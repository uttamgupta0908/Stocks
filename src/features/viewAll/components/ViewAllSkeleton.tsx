import React from 'react';
import { View, ScrollView } from 'react-native';
import { StockListItemSkeleton } from '../../../shared/components/StockListItemSkeleton';
import { Skeleton } from '../../../shared/components/Skeleton';

export const ViewAllSkeleton = () => {
    return (
        <View className="flex-1 bg-background dark:bg-slate-900">
            {/* Filter Chips Placeholder */}
            <View className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 py-3 px-4">
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} width={80} height={32} borderRadius={16} className="mr-2" />
                    ))}
                </ScrollView>
            </View>

            {/* List */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <StockListItemSkeleton key={i} />
                ))}
            </ScrollView>
        </View>
    );
};
