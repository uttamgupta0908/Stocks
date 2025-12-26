import React, { useState } from 'react';
import { View, Text, Modal, FlatList, TouchableOpacity, TextInput, Button } from 'react-native';
import { useWatchlist } from '../context/WatchlistContext';

interface AddToWatchlistModalProps {
    visible: boolean;
    onClose: () => void;
    symbol: string;
    stockName?: string;
}

import { CheckCircle2, Plus } from 'lucide-react-native';

import { useColorScheme } from 'nativewind';

export const AddToWatchlistModal = ({ visible, onClose, symbol, stockName }: AddToWatchlistModalProps) => {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const { watchlists, createWatchlist, addToWatchlist, isInWatchlist } = useWatchlist();
    const [newListName, setNewListName] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    const handleCreateAndAdd = async () => {
        if (newListName.trim()) {
            await createWatchlist(newListName);
            setNewListName('');
            setIsCreating(false);
        }
    };

    const handleSelect = async (listId: string) => {
        await addToWatchlist(listId, symbol, stockName);
        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View className="flex-1 bg-black/60 dark:bg-black/80 justify-center p-5">
                <View className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-2xl max-h-[70%]">
                    <Text className="text-xl font-bold mb-5 text-center text-gray-900 dark:text-white">
                        Add {symbol}
                    </Text>

                    <FlatList
                        data={watchlists}
                        keyExtractor={(item) => item.id}
                        className="mb-4"
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            const added = isInWatchlist(item.id, symbol);
                            return (
                                <TouchableOpacity
                                    className={`p-4 rounded-2xl mb-2 flex-row justify-between items-center ${added ? 'bg-gray-50 dark:bg-slate-700/50' : 'bg-gray-100 dark:bg-slate-700'
                                        }`}
                                    onPress={() => !added && handleSelect(item.id)}
                                    disabled={added}
                                >
                                    <Text className={`text-base font-semibold ${added ? 'text-gray-400 dark:text-slate-500' : 'text-gray-900 dark:text-white'
                                        }`}>
                                        {item.name}
                                    </Text>
                                    {added && (
                                        <View className="flex-row items-center bg-success/10 px-2 py-1 rounded-full">
                                            <CheckCircle2 size={14} color="#22C55E" />
                                            <Text className="text-success text-[10px] font-bold ml-1 uppercase">Added</Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            );
                        }}
                    />

                    {isCreating ? (
                        <View className="mt-2 space-y-3">
                            <TextInput
                                className="bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 p-4 rounded-2xl text-base text-gray-900 dark:text-white mb-3"
                                placeholder="List Name"
                                placeholderTextColor="#94A3B8"
                                value={newListName}
                                onChangeText={setNewListName}
                                autoFocus
                            />
                            <View className="flex-row space-x-3">
                                <TouchableOpacity
                                    onPress={() => setIsCreating(false)}
                                    className="flex-1 p-4 rounded-2xl bg-gray-100 dark:bg-slate-700 items-center mr-2"
                                >
                                    <Text className="text-gray-600 dark:text-slate-300 font-bold">Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleCreateAndAdd}
                                    className="flex-1 p-4 rounded-2xl bg-primary items-center"
                                >
                                    <Text className="text-white font-bold">Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <TouchableOpacity
                            onPress={() => setIsCreating(true)}
                            className="flex-row items-center justify-center p-4 border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl mt-2"
                        >
                            <Plus size={20} color="#6366F1" className="mr-2" />
                            <Text className="text-primary font-bold ml-2">Create New List</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        onPress={onClose}
                        className="mt-6 py-4 items-center"
                    >
                        <Text className="text-gray-500 dark:text-slate-400 font-semibold px-4 py-2">Not now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};
