import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Watchlist, WatchlistItem } from '../types';

const STORAGE_KEY = '@stock_app_watchlists';

interface WatchlistContextType {
    watchlists: Watchlist[];
    createWatchlist: (name: string) => Promise<void>;
    deleteWatchlist: (id: string) => Promise<void>;
    addToWatchlist: (listId: string, symbol: string, name?: string) => Promise<void>;
    removeFromWatchlist: (listId: string, symbol: string) => Promise<void>;
    isInWatchlist: (listId: string, symbol: string) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [watchlists, setWatchlists] = useState<Watchlist[]>([]);

    useEffect(() => {
        loadWatchlists();
    }, []);

    const loadWatchlists = async () => {
        try {
            const json = await AsyncStorage.getItem(STORAGE_KEY);
            if (json) {
                setWatchlists(JSON.parse(json));
            } else {
                // Create default watchlist if none
                const defaultList: Watchlist = { id: 'default', name: 'My First List', items: [] };
                setWatchlists([defaultList]);
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([defaultList]));
            }
        } catch (e) {
            console.error('Failed to load watchlists', e);
        }
    };

    const saveWatchlists = async (lists: Watchlist[]) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
            setWatchlists(lists);
        } catch (e) {
            console.error('Failed to save watchlists', e);
        }
    };

    const createWatchlist = async (name: string) => {
        const newList: Watchlist = {
            id: Date.now().toString(),
            name,
            items: [],
        };
        await saveWatchlists([...watchlists, newList]);
    };

    const deleteWatchlist = async (id: string) => {
        await saveWatchlists(watchlists.filter((w) => w.id !== id));
    };

    const addToWatchlist = async (listId: string, symbol: string, name?: string) => {
        const listIndex = watchlists.findIndex((w) => w.id === listId);
        if (listIndex === -1) return;

        const list = watchlists[listIndex];
        if (list.items.some((i) => i.symbol === symbol)) return; // Already in list

        const newItem: WatchlistItem = { symbol, name, addedAt: Date.now() };
        const updatedList = { ...list, items: [...list.items, newItem] };

        const newWatchlists = [...watchlists];
        newWatchlists[listIndex] = updatedList;

        await saveWatchlists(newWatchlists);
    };

    const removeFromWatchlist = async (listId: string, symbol: string) => {
        const listIndex = watchlists.findIndex((w) => w.id === listId);
        if (listIndex === -1) return;

        const list = watchlists[listIndex];
        const updatedList = { ...list, items: list.items.filter((i) => i.symbol !== symbol) };

        const newWatchlists = [...watchlists];
        newWatchlists[listIndex] = updatedList;

        await saveWatchlists(newWatchlists);
    };

    const isInWatchlist = (listId: string, symbol: string) => {
        const list = watchlists.find((w) => w.id === listId);
        return list ? list.items.some((i) => i.symbol === symbol) : false;
    };

    return (
        <WatchlistContext.Provider
            value={{
                watchlists,
                createWatchlist,
                deleteWatchlist,
                addToWatchlist,
                removeFromWatchlist,
                isInWatchlist,
            }}
        >
            {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlist = () => {
    const context = useContext(WatchlistContext);
    if (!context) {
        throw new Error('useWatchlist must be used within a WatchlistProvider');
    }
    return context;
};
