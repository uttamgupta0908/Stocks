import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StockTicker } from '../../../shared/types/stocks.types';
import { CompanyLogo } from '../../../shared/components/CompanyLogo';
import { PercentageBadge } from '../../../shared/components/PercentageBadge';

interface StockCardProps {
    item: StockTicker;
    onPress: () => void;
}

export const StockCard = memo(({ item, onPress }: StockCardProps) => {
    const isPositive = parseFloat(item.change_amount) >= 0;
    const changeColor = isPositive ? 'text-success' : 'text-danger';

    return (
        <TouchableOpacity
            className="bg-white dark:bg-slate-800 rounded-2xl p-4 w-[160px] mr-3 shadow-sm border border-transparent dark:border-slate-700"
            onPress={onPress}
            activeOpacity={0.7}
        >
            {/* Company Logo and Symbol */}
            <View className="flex-row items-center mb-3">
                <CompanyLogo symbol={item.ticker} size="small" />
                <Text className="text-base font-bold text-gray-900 dark:text-white ml-2">{item.ticker}</Text>
            </View>

            {/* Price */}
            <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                ${parseFloat(item.price).toFixed(2)}
            </Text>

            {/* Change Amount */}
            <Text className={`text-sm font-semibold ${changeColor} mb-2`}>
                {isPositive ? '+' : ''}${Math.abs(parseFloat(item.change_amount)).toFixed(2)}
            </Text>

            {/* Percentage Badge */}
            <PercentageBadge percentage={item.change_percentage} size="small" />
        </TouchableOpacity>
    );
});
