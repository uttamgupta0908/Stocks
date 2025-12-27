import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Modal,
    TextInput,
    Button,
    ScrollView,
} from 'react-native';
import { useWatchlist } from './context/WatchlistContext';
import { FilterChip } from '../../shared/components/FilterChip';
import { useNavigation } from '@react-navigation/native';
import { WatchlistItem } from './types';
import { WatchlistStockItem } from './components/WatchlistStockItem';
import { CustomAlert } from '../../shared/components/CustomAlert';

const FILTER_CATEGORIES = ['All Stocks', 'Tech', 'Finance', 'Health'];

import { Plus, Trash2 } from 'lucide-react-native';

export const WatchlistScreen = () => {
    const { watchlists, createWatchlist, deleteWatchlist, removeFromWatchlist } = useWatchlist();
    const [selectedListId, setSelectedListId] = useState<string | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [newListName, setNewListName] = useState('');
    const [activeFilter, setActiveFilter] = useState('All Stocks');
    const [alertConfig, setAlertConfig] = useState<{
        visible: boolean;
        title: string;
        message: string;
        onConfirm: () => void;
    }>({
        visible: false,
        title: '',
        message: '',
        onConfirm: () => { },
    });
    const navigation = useNavigation<any>();

    // Default to first list on load
    React.useEffect(() => {
        if (!selectedListId && watchlists.length > 0) {
            setSelectedListId(watchlists[0].id);
        }
    }, [watchlists, selectedListId]);

    const activeList = watchlists.find((w) => w.id === selectedListId);

    const handleCreateList = async () => {
        if (newListName.trim()) {
            await createWatchlist(newListName);
            setNewListName('');
            setModalVisible(false);
        }
    };

    const handleDeleteWatchlist = (id: string, name: string) => {
        setAlertConfig({
            visible: true,
            title: 'Delete Watchlist',
            message: `Are you sure you want to delete "${name}"? All stocks in this list will be removed.`,
            onConfirm: () => {
                deleteWatchlist(id);
                setAlertConfig((prev) => ({ ...prev, visible: false }));
            },
        });
    };

    const handleRemoveStock = (symbol: string) => {
        if (!selectedListId) return;
        setAlertConfig({
            visible: true,
            title: 'Remove Stock',
            message: `Do you want to remove ${symbol} from your watchlist?`,
            onConfirm: () => {
                removeFromWatchlist(selectedListId, symbol);
                setAlertConfig((prev) => ({ ...prev, visible: false }));
            },
        });
    };

    const renderHeader = () => (

        <View className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
            <View className="px-4 pt-6 pb-4 flex-row justify-between items-start">
                <View>
                    <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Watchlist</Text>
                    <Text className="text-sm text-gray-500 dark:text-slate-400">Track your favorite stocks</Text>
                </View>
                {watchlists.length > 1 && activeList && (
                    <TouchableOpacity
                        onPress={() => handleDeleteWatchlist(activeList.id, activeList.name)}
                        className="bg-red-50 dark:bg-red-900/20 p-2 rounded-lg"
                    >
                        <Trash2 size={20} color="#EF4444" />
                    </TouchableOpacity>
                )}
            </View>
            {/* Watchlist Tabs */}
            <View className="py-3 px-4">
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {watchlists.map((item) => (
                        <FilterChip
                            key={item.id}
                            label={item.name}
                            isActive={item.id === selectedListId}
                            onPress={() => setSelectedListId(item.id)}
                        />
                    ))}
                    <TouchableOpacity
                        className="flex-row items-center px-3"
                        onPress={() => setModalVisible(true)}
                    >
                        <Plus size={20} color="#6366F1" strokeWidth={3} />
                        <Text className="text-primary font-bold ml-1">New</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            {/* Filter Chips */}
            <View className="pb-3 px-4">
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {FILTER_CATEGORIES.map((category) => (
                        <FilterChip
                            key={category}
                            label={category}
                            isActive={activeFilter === category}
                            onPress={() => setActiveFilter(category)}
                        />
                    ))}
                </ScrollView>
            </View>
        </View>
    );

    const renderItem = ({ item }: { item: WatchlistItem }) => (
        <WatchlistStockItem
            item={item}
            onPress={() => navigation.navigate('ProductDetails', { symbol: item.symbol })}
            onRemovePress={() => handleRemoveStock(item.symbol)}
        />
    );

    return (
        <View className="flex-1 bg-background dark:bg-slate-900">
            {renderHeader()}

            {watchlists.length === 0 ? (
                <View className="flex-1 justify-center items-center p-5">
                    <Text className="text-lg text-gray-600 dark:text-slate-400 mb-2">No watchlists created.</Text>
                    <Button title="Create Watchlist" onPress={() => setModalVisible(true)} color="#6366F1" />
                </View>
            ) : activeList && activeList.items.length === 0 ? (
                <View className="flex-1 justify-center items-center p-5">
                    <Text className="text-lg text-gray-600 dark:text-slate-400 mb-2">Your watchlist is empty.</Text>
                    <Text className="text-sm text-gray-400 dark:text-slate-500 text-center">Add stocks from Explore or Product Details.</Text>
                </View>
            ) : (
                <FlatList
                    data={activeList?.items || []}
                    keyExtractor={(item) => item.symbol}
                    renderItem={renderItem}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    windowSize={5}
                />
            )}

            <Modal visible={isModalVisible} transparent animationType="slide">
                <View className="flex-1 bg-black/50 dark:bg-black/70 justify-center p-5">
                    <View className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl">
                        <Text className="text-xl font-bold mb-4 text-center text-gray-900 dark:text-white">New Watchlist</Text>
                        <TextInput
                            className="border border-gray-300 dark:border-slate-700 rounded-xl p-4 mb-4 text-base text-gray-900 dark:text-white"
                            placeholder="Watchlist Name"
                            placeholderTextColor="#9CA3AF"
                            value={newListName}
                            onChangeText={setNewListName}
                        />
                        <View className="flex-row justify-around">
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                className="px-6 py-3 bg-gray-200 dark:bg-slate-700 rounded-xl"
                            >
                                <Text className="text-gray-700 dark:text-slate-300 font-semibold">Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleCreateList}
                                className="px-6 py-3 bg-primary rounded-xl"
                            >
                                <Text className="text-white font-semibold">Create</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <CustomAlert
                visible={alertConfig.visible}
                title={alertConfig.title}
                message={alertConfig.message}
                onConfirm={alertConfig.onConfirm}
                onCancel={() => setAlertConfig((prev) => ({ ...prev, visible: false }))}
                confirmText="Delete"
            />
        </View>
    );
};
