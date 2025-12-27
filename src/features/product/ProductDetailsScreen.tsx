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
import { ProductHeaderSkeleton } from './components/ProductHeaderSkeleton';
import { ProductChartSkeleton } from './components/ProductChartSkeleton';
import { ProductStatsSkeleton } from './components/ProductStatsSkeleton';
import { ProductAboutSkeleton } from './components/ProductAboutSkeleton';

export const ProductDetailsScreen = () => {
    const route = useRoute<ProductDetailsRouteProp>();
    const navigation = useNavigation();
    const { symbol } = route.params;
    const { addToWatchlist, removeFromWatchlist, isInWatchlist, watchlists } = useWatchlist();

    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState('1M');

    // Map period to chart interval
    const getChartInterval = (period: string): 'daily' | 'weekly' | 'monthly' => {
        switch (period) {
            case '1D':
            case '1W':
                return 'daily';
            case '1M':
            case '3M':
                return 'weekly';
            case '1Y':
            case '5Y':
                return 'monthly';
            default:
                return 'daily';
        }
    };

    const chartInterval = getChartInterval(selectedPeriod);
    const { overviewQuery, quoteQuery, chartQuery } = useProductData(symbol, chartInterval);

    const isWatched = watchlists.some(w => isInWatchlist(w.id, symbol));

    useEffect(() => {
        navigation.setOptions({ title: symbol });
    }, [symbol, navigation]);

    const handleWatchlistPress = () => {
        setModalVisible(true);
    };

    if (overviewQuery.error) return <ErrorState message={overviewQuery.error.message} onRetry={overviewQuery.refetch} />;

    const overview = overviewQuery.data;
    const quote = quoteQuery.data?.['Global Quote'];
    const isOverviewLoading = overviewQuery.isLoading;
    const isQuoteLoading = quoteQuery.isLoading;

    // Get current price from quote (real-time) or fallback to overview data
    const currentPrice = quote?.['05. price'] ||
        (!isOverviewLoading && overview?.['50DayMovingAverage']) ? overview?.['50DayMovingAverage'] || '0.00' :
        '0.00';

    // Get price change from quote
    const priceChange = quote?.['09. change'] || '0.00';
    const priceChangePercent = quote?.['10. change percent'] || '0.00%';
    const isPositive = parseFloat(priceChange) >= 0;

    return (
        <View className="flex-1 bg-background dark:bg-slate-900">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Header with Logo and Favorite */}
                {isOverviewLoading ? (
                    <ProductHeaderSkeleton />
                ) : (
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
                            <PriceMetric label="Open" value={quote?.['02. open'] || overview?.['50DayMovingAverage'] || '-'} />
                            <PriceMetric label="High" value={quote?.['03. high'] || overview?.['52WeekHigh'] || '-'} />
                            <PriceMetric label="Low" value={quote?.['04. low'] || overview?.['52WeekLow'] || '-'} />
                            <PriceMetric label="Prev Close" value={quote?.['08. previous close'] || overview?.['50DayMovingAverage'] || '-'} />
                        </View>
                    </View>
                )}

                {/* Chart Section */}
                {chartQuery.isLoading ? (
                    <ProductChartSkeleton />
                ) : chartQuery.error ? (
                    <View className="bg-white dark:bg-slate-800 p-4 mt-2 border-y border-gray-100 dark:border-slate-700">
                        <TimePeriodSelector
                            periods={TIME_PERIODS}
                            selectedPeriod={selectedPeriod}
                            onSelectPeriod={setSelectedPeriod}
                        />
                        <View className="h-56 justify-center items-center">
                            <Text className="text-slate-500 dark:text-slate-400 mb-2 text-center px-4">
                                {chartQuery.error.message || 'Unable to load chart data'}
                            </Text>
                            <TouchableOpacity
                                onPress={() => chartQuery.refetch()}
                                className="bg-primary px-4 py-2 rounded-lg mt-2"
                            >
                                <Text className="text-white font-semibold">Retry</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View className="bg-white dark:bg-slate-800 p-4 mt-2 border-y border-gray-100 dark:border-slate-700">
                        <TimePeriodSelector
                            periods={TIME_PERIODS}
                            selectedPeriod={selectedPeriod}
                            onSelectPeriod={setSelectedPeriod}
                        />
                        <PriceChart data={chartQuery.data} />
                    </View>
                )}

                {/* Key Statistics */}
                {isOverviewLoading ? (
                    <ProductStatsSkeleton />
                ) : (
                    <View className="bg-white dark:bg-slate-800 p-4 mt-2 border-y border-gray-100 dark:border-slate-700">
                        <Text className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Key Statistics</Text>
                        <View className="flex-row flex-wrap justify-between">
                            <StatItem label="Market Cap" value={overview?.MarketCapitalization} />
                            <StatItem label="P/E Ratio" value={overview?.PERatio} />
                            <StatItem label="Dividend Yield" value={overview?.DividendYield} />
                            <StatItem label="Beta" value={overview?.Beta || '1.24'} />
                        </View>
                    </View>
                )}

                {/* About Company */}
                {isOverviewLoading ? (
                    <ProductAboutSkeleton />
                ) : (
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
                )}

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
