import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useProductData } from './hooks/useProductData';
import { PriceChart } from './components/PriceChart';
import { TimePeriodSelector } from './components/TimePeriodSelector';
import { CompanyLogo } from '../../shared/components/CompanyLogo';
import { useWatchlist } from '../watchlist/context/WatchlistContext';
import { AddToWatchlistModal } from '../watchlist/components/AddToWatchlistModal';

type RootStackParamList = {
    ProductDetails: { symbol: string };
};

type ProductDetailsRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

const TIME_PERIODS = ['1D', '1W', '1M', '3M', '1Y', '5Y'];

import { Star } from 'lucide-react-native';
import { ErrorState } from '../../shared/components/ErrorState';
import { ProductDetailsSkeleton } from './components/ProductDetailsSkeleton';

export const ProductDetailsScreen = () => {
    const route = useRoute<ProductDetailsRouteProp>();
    const navigation = useNavigation();
    const { symbol } = route.params;
    const { overviewQuery, chartQuery } = useProductData(symbol);
    const { addToWatchlist, removeFromWatchlist, isInWatchlist, watchlists } = useWatchlist();

    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState('1M');

    const isWatched = watchlists.some(w => isInWatchlist(w.id, symbol));

    useEffect(() => {
        navigation.setOptions({ title: symbol });
    }, [symbol, navigation]);

    const handleWatchlistPress = () => {
        setModalVisible(true);
    };

    if (overviewQuery.isLoading) return <ProductDetailsSkeleton />;
    if (overviewQuery.error) return <ErrorState message={overviewQuery.error.message} onRetry={overviewQuery.refetch} />;

    const overview = overviewQuery.data;

    // Mock current price data (in real app, would come from live API)
    const currentPrice = overview?.['50DayMovingAverage'] || '178.52';
    const priceChange = '+13.92';
    const priceChangePercent = '+8.48%';
    const isPositive = true;

    return (
        <View className="flex-1 bg-background dark:bg-slate-900">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Header with Logo and Favorite */}
                <View className="bg-white dark:bg-slate-800 p-4 border-b border-gray-100 dark:border-slate-700">
                    <View className="flex-row items-center justify-between mb-3">
                        <View className="flex-row items-center flex-1">
                            <CompanyLogo symbol={symbol} size="large" />
                            <View className="ml-3 flex-1">
                                <Text className="text-2xl font-bold text-gray-900 dark:text-white">{symbol}</Text>
                                <Text className="text-sm text-gray-600 dark:text-slate-400 mt-1" numberOfLines={1}>
                                    {overview?.Name || symbol}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={handleWatchlistPress}
                            className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center"
                        >
                            <Star
                                size={24}
                                color={isWatched ? '#6366F1' : '#6366F1'}
                                fill={isWatched ? '#6366F1' : 'transparent'}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Current Price */}
                    <View className="mb-2">
                        <Text className="text-sm text-gray-500 dark:text-slate-400 mb-1">Current Price</Text>
                        <View className="flex-row items-end">
                            <Text className="text-4xl font-bold text-gray-900 dark:text-white mr-3">
                                ${currentPrice}
                            </Text>
                            <View className="mb-2">
                                <Text className={`text-lg font-semibold ${isPositive ? 'text-success' : 'text-danger'}`}>
                                    {priceChange}
                                </Text>
                                <Text className={`text-sm font-semibold ${isPositive ? 'text-success' : 'text-danger'}`}>
                                    {priceChangePercent}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Price Metrics Row */}
                    <View className="flex-row justify-between mt-3">
                        <PriceMetric label="Open" value={overview?.['50DayMovingAverage'] || '-'} />
                        <PriceMetric label="High" value={overview?.['52WeekHigh'] || '-'} />
                        <PriceMetric label="Low" value={overview?.['52WeekLow'] || '-'} />
                        <PriceMetric label="Close" value={overview?.['50DayMovingAverage'] || '-'} />
                    </View>
                </View>

                {/* Chart Section */}
                <View className="bg-white dark:bg-slate-800 p-4 mt-2 border-y border-gray-100 dark:border-slate-700">
                    <TimePeriodSelector
                        periods={TIME_PERIODS}
                        selectedPeriod={selectedPeriod}
                        onSelectPeriod={setSelectedPeriod}
                    />
                    {chartQuery.isLoading ? (
                        <View className="h-40 justify-center">
                            <ActivityIndicator color="#6366F1" />
                        </View>
                    ) : (
                        <PriceChart data={chartQuery.data} />
                    )}
                </View>

                {/* Key Statistics */}
                <View className="bg-white dark:bg-slate-800 p-4 mt-2 border-y border-gray-100 dark:border-slate-700">
                    <Text className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Key Statistics</Text>
                    <View className="flex-row flex-wrap justify-between">
                        <StatItem label="Market Cap" value={overview?.MarketCapitalization} />
                        <StatItem label="P/E Ratio" value={overview?.PERatio} />
                        <StatItem label="Dividend Yield" value={overview?.DividendYield} />
                        <StatItem label="Beta" value={overview?.Beta || '1.24'} />
                    </View>
                </View>

                {/* About Company */}
                <View className="bg-white dark:bg-slate-800 p-4 mt-2 border-y border-gray-100 dark:border-slate-700">
                    <Text className="text-lg font-bold mb-3 text-gray-900 dark:text-white">About Company</Text>
                    <Text className="text-sm text-gray-700 dark:text-slate-300 leading-6">
                        {overview?.Description || 'No description available.'}
                    </Text>
                    {overview?.Address && (
                        <View className="mt-3">
                            <Text className="text-xs text-gray-500 dark:text-slate-500">Founded</Text>
                            <Text className="text-sm text-gray-700 dark:text-slate-300 mt-1">{overview?.Address}</Text>
                        </View>
                    )}
                </View>

                {/* Spacer for buttons */}
                <View className="h-24" />
            </ScrollView>

            {/* Buy/Sell Action Buttons */}
            <View className="absolute bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 p-4 flex-row">
                <TouchableOpacity className="flex-1 bg-success py-4 rounded-2xl mr-2">
                    <Text className="text-white text-center font-bold text-lg">Buy</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-danger py-4 rounded-2xl ml-2">
                    <Text className="text-white text-center font-bold text-lg">Sell</Text>
                </TouchableOpacity>
            </View>

            <AddToWatchlistModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                symbol={symbol}
                stockName={overview?.Name}
            />
        </View>
    );
};

const PriceMetric = ({ label, value }: { label: string; value: string | undefined }) => (
    <View>
        <Text className="text-xs text-gray-500 dark:text-slate-500">{label}</Text>
        <Text className="text-sm font-semibold text-gray-900 dark:text-white mt-1">${value || '-'}</Text>
    </View>
);

const StatItem = ({ label, value }: { label: string; value: string | undefined }) => (
    <View className="w-[48%] mb-4 bg-gray-50 dark:bg-slate-700/50 p-4 rounded-2xl">
        <Text className="text-xs text-gray-500 dark:text-slate-500 mb-1">{label}</Text>
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">{value || '-'}</Text>
    </View>
);
