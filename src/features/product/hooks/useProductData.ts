import { useQuery } from '@tanstack/react-query';
import { stockApi } from '../../../shared/services/stocks.api';

export const useProductData = (symbol: string) => {
  const overviewQuery = useQuery({
    queryKey: ['companyOverview', symbol],
    queryFn: () => stockApi.getCompanyOverview(symbol),
    enabled: !!symbol,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours (fundamental data changes rarely)
  });

  const chartQuery = useQuery({
    queryKey: ['dailyTimeSeries', symbol],
    queryFn: () => stockApi.getDailyTimeSeries(symbol),
    enabled: !!symbol,
    staleTime: 60 * 60 * 1000, // 1 hour
  });

  return { overviewQuery, chartQuery };
};
