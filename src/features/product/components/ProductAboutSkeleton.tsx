import React from 'react';
import { View } from 'react-native';
import { Skeleton } from '../../../shared/components/Skeleton';

export const ProductAboutSkeleton = () => {
    return (
        <View className="bg-white dark:bg-slate-800 p-4 mt-2 border-y border-gray-100 dark:border-slate-700">
            <Skeleton width={130} height={22} className="mb-3" />
            <Skeleton width="100%" height={14} className="mb-2" />
            <Skeleton width="100%" height={14} className="mb-2" />
            <Skeleton width="80%" height={14} className="mb-4" />
            <Skeleton width={50} height={12} className="mb-1" />
            <Skeleton width={150} height={14} />
        </View>
    );
};

