import { StockTicker } from '../../shared/types/stocks.types';

export interface WatchlistItem {
  symbol: string;
  name?: string; // Optional, might process later
  addedAt: number;
}

export interface Watchlist {
  id: string;
  name: string;
  items: WatchlistItem[];
}
