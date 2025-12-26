import React, { useState } from 'react';
import { View, FlatList, ActivityIndicator, ScrollView, Text } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { useExploreData } from '../explore/hooks/useExploreData';
import { StockListItem } from '../../shared/components/StockListItem';
import { FilterChip } from '../../shared/components/FilterChip';
import { useWatchlist } from '../watchlist/context/WatchlistContext';
import { StockTicker } from '../../shared/types/stocks.types';
import { ViewAllSkeleton } from './components/ViewAllSkeleton';

type RootStackParamList = {
    ViewAll: { category: string };
};

const FILTER_CATEGORIES = ['All Stocks', 'Tech', 'Finance', 'Health'];

export const ViewAllScreen = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'ViewAll'>>();
    const navigation = useNavigation<any>();
    const { category } = route.params; // "Top Gainers" or "Top Losers"
    const [activeFilter, setActiveFilter] = useState('All Stocks');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSymbol, setSelectedSymbol] = useState('');

    const { data, isLoading } = useExploreData();
    const { watchlists, addToWatchlist } = useWatchlist();

    if (isLoading) return <ViewAllSkeleton />;

    let listData: StockTicker[] = [];
    if (category === 'Top Gainers') {
        listData = data?.top_gainers || [];
    } else if (category === 'Top Losers') {
        listData = data?.top_losers || [];
    } else {
        // Default fallback
        listData = data?.most_actively_traded || [];
    }

    const handleAddToWatchlist = (symbol: string) => {
        // Add to first watchlist if available
        if (watchlists.length > 0) {
            addToWatchlist(watchlists[0].id, symbol, symbol);
        }
    };

    return (
        <View className="flex-1 bg-background dark:bg-slate-900">
            {/* Filter Chips */}
            <View className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 py-3 px-4">
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {FILTER_CATEGORIES.map((filterCategory) => (
                        <FilterChip
                            key={filterCategory}
                            label={filterCategory}
                            isActive={activeFilter === filterCategory}
                            onPress={() => setActiveFilter(filterCategory)}
                        />
                    ))}
                </ScrollView>
            </View>

            {/* Stock List */}
            <FlatList
                data={listData}
                keyExtractor={(item) => item.ticker}
                renderItem={({ item }) => (
                    <StockListItem
                        symbol={item.ticker}
                        name={item.ticker} // Name is not in this endpoint, use ticker
                        price={item.price}
                        change={item.change_amount}
                        changePercent={item.change_percentage}
                        onPress={() => navigation.navigate('ProductDetails', { symbol: item.ticker })}
                        showAddButton={true}
                        onAddPress={() => handleAddToWatchlist(item.ticker)}
                    />
                )}
            />
        </View>
    );
};
