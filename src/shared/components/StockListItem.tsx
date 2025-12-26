import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CompanyLogo } from './CompanyLogo';
import { PercentageBadge } from './PercentageBadge';

interface StockListItemProps {
    symbol: string;
    name?: string;
    price?: string | number;
    change?: string | number;
    changePercent?: string | number;
    onPress: () => void;
    onAddPress?: () => void;
    onRemovePress?: () => void;
    showAddButton?: boolean;
    showRemoveButton?: boolean;
}

import { Plus, Trash2 } from 'lucide-react-native';

export const StockListItem: React.FC<StockListItemProps> = ({
    symbol,
    name,
    price,
    change,
    changePercent,
    onPress,
    onAddPress,
    onRemovePress,
    showAddButton = false,
    showRemoveButton = false,
}) => {
    const numChange = typeof change === 'string' ? parseFloat(change) : (change || 0);
    const isPositive = numChange >= 0;
    const changeColor = isPositive ? 'text-success' : 'text-danger';

    const formatPrice = (p: string | number | undefined): string => {
        if (!p) return '-';
        const num = typeof p === 'string' ? parseFloat(p) : p;
        return `$${num.toFixed(2)}`;
    };

    const formatChange = (c: string | number | undefined): string => {
        if (!c) return '-';
        const num = typeof c === 'string' ? parseFloat(c) : c;
        return `${isPositive ? '+' : ''}$${Math.abs(num).toFixed(2)}`;
    };

    return (
        <TouchableOpacity
            className="flex-row items-center p-4 bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700"
            onPress={onPress}
            activeOpacity={0.7}
        >
            {/* Company Logo */}
            <CompanyLogo symbol={symbol} size="medium" />

            {/* Stock Info */}
            <View className="flex-1 ml-3">
                <Text className="text-base font-bold text-gray-900 dark:text-white">{symbol}</Text>
                {name && (
                    <Text className="text-sm text-gray-500 dark:text-slate-400 mt-0.5" numberOfLines={1}>
                        {name}
                    </Text>
                )}
            </View>

            {/* Price and Change */}
            <View className="items-end mr-3">
                <Text className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {formatPrice(price)}
                </Text>
                {change !== undefined && (
                    <Text className={`text-sm font-semibold ${changeColor}`}>
                        {formatChange(change)}
                    </Text>
                )}
            </View>

            {/* Percentage Badge */}
            {changePercent !== undefined && (
                <View className="mr-3">
                    <PercentageBadge percentage={changePercent} size="small" />
                </View>
            )}

            {/* Action Button */}
            {(showAddButton && onAddPress) ? (
                <TouchableOpacity
                    onPress={(e) => {
                        e.stopPropagation();
                        onAddPress();
                    }}
                    className="w-8 h-8 bg-gray-100 dark:bg-slate-700 rounded-full items-center justify-center"
                    activeOpacity={0.4}
                >
                    <Plus size={18} color="#4B5563" strokeWidth={3} />
                </TouchableOpacity>
            ) : (showRemoveButton && onRemovePress) ? (
                <TouchableOpacity
                    onPress={(e) => {
                        e.stopPropagation();
                        onRemovePress();
                    }}
                    className="w-8 h-8 bg-red-50 dark:bg-red-900/30 rounded-full items-center justify-center"
                    activeOpacity={0.4}
                >
                    <Trash2 size={16} color="#EF4444" strokeWidth={2.5} />
                </TouchableOpacity>
            ) : null}
        </TouchableOpacity>
    );
};
