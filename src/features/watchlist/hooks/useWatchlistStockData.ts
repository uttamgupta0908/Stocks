import { useQuery } from '@tanstack/react-query';
import { stockApi } from '../../../shared/services/stocks.api';

/**
 * Hook to fetch stock overview data for a single symbol
 * Returns loading state and data for individual stock items
 */
export const useWatchlistStockData = (symbol: string) => {
  const query = useQuery({
    queryKey: ['companyOverview', symbol],
    queryFn: () => stockApi.getCompanyOverview(symbol),
    enabled: !!symbol,
    staleTime: 5 * 60 * 1000, // 5 minutes cache for watchlist items
    retry: 1,
  });

  return {
    isLoading: query.isLoading,
    data: query.data,
    error: query.error,
  };
};

