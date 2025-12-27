import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    FlatList,
    TextInput,
    TouchableOpacity,
    LayoutAnimation,
    Platform,
    UIManager,
    Keyboard,
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


import { TrendingUp, CircleDollarSign, Flame, Sun, Moon, Search, X } from 'lucide-react-native';
import { stockApi } from '../../shared/services/stocks.api';
import { CompanyLogo } from '../../shared/components/CompanyLogo';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/AppNavigation';

export const ExploreScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
    const { colorScheme, toggleColorScheme } = useColorScheme();
    const { data, isLoading, error, refetch } = useExploreData();

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    useEffect(() => {
        if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }, []);

    const toggleSearchFocus = (focused: boolean) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsSearchFocused(focused);
        if (!focused) {
            setSearchQuery('');
            setIsSearching(false);
            Keyboard.dismiss();
        }
    };

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
        if (searchLoading) {
            return (
                <View className="px-4 mt-2">
                    <View className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <View key={i} className={`p-4 flex-row items-center ${i !== 5 ? 'border-b border-gray-50 dark:border-slate-700/50' : ''}`}>
                                <View className="bg-gray-50 dark:bg-slate-700/50 p-2 rounded-2xl">
                                    <View className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-600 animate-pulse" />
                                </View>
                                <View className="ml-4 flex-1">
                                    <View className="w-16 h-4 bg-gray-200 dark:bg-slate-600 rounded-md mb-2 animate-pulse" />
                                    <View className="w-32 h-3 bg-gray-100 dark:bg-slate-700 rounded-md animate-pulse" />
                                </View>
                                <View className="w-6 h-6 rounded-full bg-primary/10 animate-pulse" />
                            </View>
                        ))}
                    </View>
                </View>
            );
        }

        if (isSearching && searchResults.length === 0) {
            return (
                <View className="mt-10">
                    <EmptyState fullScreen={false} title="No Stocks Found" />
                </View>
            );
        }

        return (
            <View className="px-4 mt-2">
                <View className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700">
                    {searchResults.map((item, index) => (
                        <TouchableOpacity
                            key={item['1. symbol'] || index}
                            className={`p-4 flex-row items-center ${index !== searchResults.length - 1 ? 'border-b border-gray-50 dark:border-slate-700/50' : ''}`}
                            onPress={() => {
                                navigation.navigate('ProductDetails', { symbol: item['1. symbol'] });
                                toggleSearchFocus(false);
                            }}
                        >
                            <View className="bg-gray-50 dark:bg-slate-700/50 p-2 rounded-2xl">
                                <CompanyLogo symbol={item['1. symbol']} size="small" />
                            </View>
                            <View className="ml-4 flex-1">
                                <Text className="font-bold text-gray-900 dark:text-white text-base">{item['1. symbol']}</Text>
                                <Text className="text-gray-500 dark:text-slate-400 text-xs" numberOfLines={1}>{item['2. name']}</Text>
                            </View>
                            <View className="bg-primary/10 p-1.5 rounded-full">
                                <Search size={14} color="#6366F1" />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        );
    };

    if (error) return <ErrorState message={error.message} onRetry={refetch} />;

    return (
        <ScrollView className="flex-1 bg-background dark:bg-slate-900" showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            {/* Header */}
            {!isSearchFocused && (
                <>
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
                </>
            )}

            {/* Search Bar */}
            <View className={`px-4 mb-4 ${isSearchFocused ? 'pt-6 flex-row items-center' : ''}`}>
                <View className="flex-1 relative flex-row items-center">
                    <View className="absolute left-4 z-10">
                        <Search size={20} color={isSearchFocused ? "#6366F1" : "#94A3B8"} />
                    </View>
                    <TextInput
                        className={`flex-1 bg-white dark:bg-slate-800 py-3.5 pl-12 pr-10 rounded-2xl border ${isSearchFocused ? 'border-primary shadow-lg shadow-primary/20' : 'border-gray-200 dark:border-slate-700'
                            } text-base text-gray-900 dark:text-white`}
                        placeholder="Search stocks (e.g. IBM)"
                        placeholderTextColor="#9CA3AF"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onFocus={() => toggleSearchFocus(true)}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity
                            onPress={() => setSearchQuery('')}
                            className="absolute right-4"
                        >
                            <View className="bg-gray-100 dark:bg-slate-700 rounded-full p-1">
                                <X size={14} color="#64748B" />
                            </View>
                        </TouchableOpacity>
                    )}
                </View>

                {isSearchFocused && (
                    <TouchableOpacity
                        onPress={() => toggleSearchFocus(false)}
                        className="ml-4"
                    >
                        <Text className="text-primary font-bold text-base">Cancel</Text>
                    </TouchableOpacity>
                )}
            </View>

            {isSearching || searchLoading ? renderSearchResults() : (
                <>
                    {renderSection('Top Gainers', data?.top_gainers, isLoading)}
                    {renderSection('Top Losers', data?.top_losers, isLoading)}
                </>
            )}
            {isSearchFocused && <View className="h-4" />}
        </ScrollView>
    );
};
