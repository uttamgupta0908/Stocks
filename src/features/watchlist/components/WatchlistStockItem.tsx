import React from 'react';
import { StockListItem } from '../../../shared/components/StockListItem';
import { StockListItemSkeleton } from '../../../shared/components/StockListItemSkeleton';
import { useWatchlistStockData } from '../hooks/useWatchlistStockData';
import { WatchlistItem } from '../types';

interface WatchlistStockItemProps {
    item: WatchlistItem;
    onPress: () => void;
    onRemovePress: () => void;
}

export const WatchlistStockItem: React.FC<WatchlistStockItemProps> = ({
    item,
    onPress,
    onRemovePress,
}) => {
    const { isLoading, data } = useWatchlistStockData(item.symbol);

    // Show skeleton while loading
    if (isLoading) {
        return <StockListItemSkeleton />;
    }

    // Extract price and other data from API response
    // If API call failed or no data, show the item without price (falls back to "-")
    const price = data?.['50DayMovingAverage'] || undefined;
    const companyName = data?.Name || item.name;

    return (
        <StockListItem
            symbol={item.symbol}
            name={companyName}
            price={price ? parseFloat(price) : undefined}
            onPress={onPress}
            showRemoveButton={true}
            onRemovePress={onRemovePress}
        />
    );
};

