import axios from 'axios';
// @ts-ignore
import { ALPHA_VANTAGE_API_KEY } from '@env';
import {
  GainersLosersResponse,
  CompanyOverview,
  SearchResult,
  TimeSeriesResponse,
} from '../types/stocks.types';

const BASE_URL = 'https://www.alphavantage.co/query';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Helper to check for API limit/error messages in 200 OK responses
const handleApiResponse = (response: any) => {
  if (response.data?.['Note']) {
    throw new Error('API limit exceeded: ' + response.data['Note']);
  }
  if (response.data?.['Error Message']) {
    throw new Error('API Error: ' + response.data['Error Message']);
  }
  if (response.data?.['Information']) {
     // Sometimes API returns "Information" for specific status
     // Treat as error or quota limit depending on content, but usually it's about premium endpoints
     if (response.data['Information'].includes('Standard API')) {
         throw new Error('API Limit or Premium Endpoint: ' + response.data['Information']);
     }
  }
  return response.data;
};

export const stockApi = {
  getTopGainersLosers: async (): Promise<GainersLosersResponse> => {
    const response = await apiClient.get('', {
      params: {
        function: 'TOP_GAINERS_LOSERS',
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });
    return handleApiResponse(response);
  },

  getCompanyOverview: async (symbol: string): Promise<CompanyOverview> => {
    const response = await apiClient.get('', {
      params: {
        function: 'OVERVIEW',
        symbol,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });
    return handleApiResponse(response);
  },

  searchTicker: async (keywords: string): Promise<SearchResult[]> => {
    const response = await apiClient.get('', {
      params: {
        function: 'SYMBOL_SEARCH',
        keywords,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });
    const data = handleApiResponse(response);
    return data.bestMatches || [];
  },

  getDailyTimeSeries: async (symbol: string): Promise<TimeSeriesResponse> => {
    const response = await apiClient.get('', {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });
    return handleApiResponse(response);
  },
};
