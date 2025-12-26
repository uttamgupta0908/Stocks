import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { StatisticsCardSkeleton } from './StatisticsCardSkeleton';
import { StockCardSkeleton } from '../../../shared/components/StockCardSkeleton';
import { Skeleton } from '../../../shared/components/Skeleton';

export const ExploreSkeleton = () => {
    return (
        <ScrollView className="flex-1 bg-background dark:bg-slate-900" showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View className="px-4 pt-6 pb-4">
                <Skeleton width={120} height={36} className="mb-2" />
                <Skeleton width={180} height={16} />
            </View>

            {/* Statistics */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-6"
                contentContainerStyle={{ paddingHorizontal: 16 }}
            >
                {[1, 2, 3].map((i) => (
                    <StatisticsCardSkeleton key={i} />
                ))}
            </ScrollView>

            {/* Search Bar Placeholder */}
            <View className="px-4 mb-6">
                <Skeleton width="100%" height={56} borderRadius={16} />
            </View>

            {/* Sections */}
            {[1, 2].map((sectionId) => (
                <View key={sectionId} className="mb-6">
                    <View className="flex-row justify-between items-center mb-4 px-4">
                        <Skeleton width={100} height={24} />
                        <Skeleton width={60} height={16} />
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 16 }}
                    >
                        {[1, 2, 3, 4].map((i) => (
                            <StockCardSkeleton key={i} />
                        ))}
                    </ScrollView>
                </View>
            ))}
        </ScrollView>
    );
};
