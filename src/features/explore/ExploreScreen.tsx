import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    FlatList,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { useColorScheme } from 'nativewind';
import { useExploreData } from './hooks/useExploreData';
import { StockCard } from './components/StockCard';
import { StatisticsCard } from './components/StatisticsCard';
import { StockTicker } from '../../shared/types/stocks.types';
import { ErrorState } from '../../shared/components/ErrorState';
import { EmptyState } from '../../shared/components/EmptyState';
import { StockListItemSkeleton } from '../../shared/components/StockListItemSkeleton';
import { StockCardSkeleton } from '../../shared/components/StockCardSkeleton';


import { TrendingUp, CircleDollarSign, Flame, Sun, Moon } from 'lucide-react-native';
import { stockApi } from '../../shared/services/stocks.api';
import { CompanyLogo } from '../../shared/components/CompanyLogo';

export const ExploreScreen = ({ navigation }: any) => {
    const { colorScheme, toggleColorScheme } = useColorScheme();
    const { data, isLoading, error, refetch } = useExploreData();

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);

    // Debounced search logic
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.length > 1) {
                setSearchLoading(true);
                try {
                    const results = await stockApi.searchTicker(searchQuery);
                    setSearchResults(results);
                    setIsSearching(true);
                } catch (e) {
                    console.error(searchQuery, e);
                } finally {
                    setSearchLoading(false);
                }
            } else {
                setIsSearching(false);
                setSearchResults([]);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleStockPress = (item: StockTicker) => {
        navigation.navigate('ProductDetails', { symbol: item.ticker });
    };

    const renderSection = (title: string, sectionData: StockTicker[] | undefined, isLoading: boolean) => (
        <View className="mb-6">
            <View className="flex-row justify-between items-center mb-4 px-4">
                <Text className="text-xl font-bold text-gray-900 dark:text-white">{title}</Text>
                {!isLoading && (
                    <TouchableOpacity onPress={() => navigation.navigate('ViewAll', { category: title })}>
                        <Text className="text-primary font-semibold text-sm">View All</Text>
                    </TouchableOpacity>
                )}
            </View>
            {isLoading ? (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16 }}

                >
                    {[1, 2, 3, 4, 5].map((i) => (
                        <StockCardSkeleton key={i} />
                    ))}
                </ScrollView>
            ) : (
                <FlatList
                    horizontal
                    data={sectionData?.slice(0, 5)}
                    renderItem={({ item }) => (
                        <StockCard item={item} onPress={() => handleStockPress(item)} />
                    )}
                    keyExtractor={(item) => item.ticker}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                />

            )}
        </View>
    );

    const renderSearchResults = () => {
        // if (searchLoading) { 
        return (
            <View className="px-4 mb-5">
                {[1, 2, 3].map((i) => (
                    <StockListItemSkeleton key={i} />
                ))}
            </View>
        );
        // }

        if (isSearching && searchResults.length === 0) {
            return <EmptyState fullScreen={false} title="No Stocks Found" />;
        }
        console.log("searchResults", searchResults)
        return (
            <View className="bg-white dark:bg-slate-800 rounded-2xl p-2 mb-5 mx-4 shadow-sm">
                {searchResults.map((item) => (
                    <TouchableOpacity
                        key={item['1. symbol']}
                        className="p-3 border-b border-gray-100 dark:border-slate-700 flex-row items-center"
                        onPress={() => {
                            navigation.navigate('ProductDetails', { symbol: item['1. symbol'] });
                            setSearchQuery('');
                            setIsSearching(false);
                        }}
                    >
                        <CompanyLogo symbol={item['1. symbol']} size="small" />
                        <View className="ml-3 flex-1 overflow-hidden">
                            <Text className="font-bold text-gray-900 dark:text-white">{item['1. symbol']}</Text>
                            <Text className="text-gray-600 dark:text-slate-400 text-xs" numberOfLines={1}>{item['2. name']}</Text>
                        </View>
                    </TouchableOpacity>
                ))}

            </View>
        );
    };

    if (error) return <ErrorState message={error.message} onRetry={refetch} />;

    return (
        <ScrollView className="flex-1 bg-background dark:bg-slate-900" showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View className="px-4 pt-6 pb-4 flex-row justify-between items-center">
                <View>
                    <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Explore</Text>
                    <Text className="text-sm text-gray-500 dark:text-slate-400">Explore the Stockmarket</Text>
                </View>
                <TouchableOpacity
                    onPress={toggleColorScheme}
                    className="bg-gray-100 dark:bg-slate-800 p-2.5 rounded-full"
                >
                    {colorScheme === 'dark' ? (
                        <Sun size={20} color="#6366F1" />
                    ) : (
                        <Moon size={20} color="#6366F1" />
                    )}
                </TouchableOpacity>
            </View>

            {/* Statistics Cards */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-6"
                contentContainerStyle={{ paddingHorizontal: 16 }}
            >
                <StatisticsCard
                    icon={TrendingUp}
                    label="Market Cap"
                    value="19,674"
                    change="+0.25%"
                    backgroundColor="primary"
                />
                <StatisticsCard
                    icon={CircleDollarSign}
                    label="Volume"
                    value="65,982"
                    change="+1.5%"
                    backgroundColor="success"
                />
                <StatisticsCard
                    icon={Flame}
                    label="Active"
                    value="14,127"
                    change="-0.8%"
                    backgroundColor="warning"
                />
            </ScrollView>

            {/* Search Bar */}
            <View className="px-4 mb-4" >
                <TextInput
                    className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-200 dark:border-slate-700 text-base text-gray-900 dark:text-white"
                    placeholder="Search stocks (e.g. IBM)"
                    placeholderTextColor="#9CA3AF"
                    value={searchQuery}
                    onChangeText={setSearchQuery}

                />
            </View>

            {isSearching || searchLoading ? renderSearchResults() : (
                <>
                    {renderSection('Top Gainers', data?.top_gainers, isLoading)}
                    {renderSection('Top Losers', data?.top_losers, isLoading)}
                </>
            )}
        </ScrollView>
    );
};
