import { useQuery } from '@tanstack/react-query';
import { stockApi } from '../../../shared/services/stocks.api';

export const useExploreData = () => {
  return useQuery({
    queryKey: ['gainersLosers'],
    queryFn: stockApi.getTopGainersLosers,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    retry: 1,
  });
};
