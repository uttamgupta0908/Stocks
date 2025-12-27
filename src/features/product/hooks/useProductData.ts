import { useQuery } from '@tanstack/react-query';
import { stockApi, symbolUtils } from '../../../shared/services/stocks.api';
import { 
  TimeSeriesResponse, 
  WeeklyTimeSeriesResponse, 
  MonthlyTimeSeriesResponse 
} from '../../../shared/types/stocks.types';

export type TimeSeriesInterval = 'daily' | 'weekly' | 'monthly';
export type ChartDataResponse = TimeSeriesResponse | WeeklyTimeSeriesResponse | MonthlyTimeSeriesResponse;

export const useProductData = (symbol: string, chartInterval: TimeSeriesInterval = 'daily') => {
  // Format symbol for API (especially for Indian markets)
  const formattedSymbol = symbolUtils.formatForAPI(symbol);

  const overviewQuery = useQuery({
    queryKey: ['companyOverview', formattedSymbol],
    queryFn: () => stockApi.getCompanyOverview(formattedSymbol),
    enabled: !!symbol,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours (fundamental data changes rarely)
  });

  // Get quote for real-time price
  const quoteQuery = useQuery({
    queryKey: ['globalQuote', formattedSymbol],
    queryFn: () => stockApi.getGlobalQuote(formattedSymbol),
    enabled: !!symbol,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Chart query based on selected interval
  const chartQuery = useQuery<ChartDataResponse>({
    queryKey: [chartInterval === 'daily' ? 'dailyTimeSeries' : chartInterval === 'weekly' ? 'weeklyTimeSeries' : 'monthlyTimeSeries', formattedSymbol, chartInterval],
    queryFn: async () => {
      switch (chartInterval) {
        case 'weekly':
          return stockApi.getWeeklyTimeSeries(formattedSymbol);
        case 'monthly':
          return stockApi.getMonthlyTimeSeries(formattedSymbol);
        default:
          return stockApi.getDailyTimeSeries(formattedSymbol, 'compact');
      }
    },
    enabled: !!symbol,
    staleTime: 60 * 60 * 1000, // 1 hour
  });

  return { overviewQuery, quoteQuery, chartQuery };
};
