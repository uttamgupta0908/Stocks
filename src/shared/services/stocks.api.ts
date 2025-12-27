import axios from 'axios';
// @ts-ignore
import { ALPHA_VANTAGE_API_KEY } from '@env';
import {
  GainersLosersResponse,
  CompanyOverview,
  SearchResult,
  TimeSeriesResponse,
  WeeklyTimeSeriesResponse,
  MonthlyTimeSeriesResponse,
  GlobalQuoteResponse,
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

  getDailyTimeSeries: async (symbol: string, outputsize: 'compact' | 'full' = 'compact'): Promise<TimeSeriesResponse> => {
    const response = await apiClient.get('', {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol,
        outputsize,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });
    return handleApiResponse(response);
  },

  getWeeklyTimeSeries: async (symbol: string): Promise<WeeklyTimeSeriesResponse> => {
    const response = await apiClient.get('', {
      params: {
        function: 'TIME_SERIES_WEEKLY',
        symbol,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });
    return handleApiResponse(response);
  },

  getMonthlyTimeSeries: async (symbol: string): Promise<MonthlyTimeSeriesResponse> => {
    const response = await apiClient.get('', {
      params: {
        function: 'TIME_SERIES_MONTHLY',
        symbol,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });
    return handleApiResponse(response);
  },

  getGlobalQuote: async (symbol: string): Promise<GlobalQuoteResponse> => {
    const response = await apiClient.get('', {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });
    return handleApiResponse(response);
  },
};

/**
 * Helper functions for Indian market symbols
 */
export const symbolUtils = {
  /**
   * Format symbol for BSE (Bombay Stock Exchange)
   * Example: "RELIANCE" -> "RELIANCE.BSE"
   */
  formatBSESymbol: (symbol: string): string => {
    // Remove .BSE if already present to avoid duplication
    const cleanSymbol = symbol.replace(/\.BSE$/i, '');
    return `${cleanSymbol.toUpperCase()}.BSE`;
  },

  /**
   * Format symbol for NSE (National Stock Exchange) - if supported
   * Note: Alpha Vantage primarily supports BSE format for Indian stocks
   */
  formatNSESymbol: (symbol: string): string => {
    const cleanSymbol = symbol.replace(/\.NSE$/i, '');
    return `${cleanSymbol.toUpperCase()}.NSE`;
  },

  /**
   * Check if symbol is an Indian market symbol
   */
  isIndianMarketSymbol: (symbol: string): boolean => {
    return /\.(BSE|NSE)$/i.test(symbol);
  },

  /**
   * Get clean symbol without exchange suffix
   */
  getCleanSymbol: (symbol: string): string => {
    return symbol.replace(/\.(BSE|NSE)$/i, '');
  },

  /**
   * Format symbol for Alpha Vantage API
   * For Indian stocks, ensures BSE format
   */
  formatForAPI: (symbol: string, forceBSE: boolean = false): string => {
    if (forceBSE && !symbolUtils.isIndianMarketSymbol(symbol)) {
      return symbolUtils.formatBSESymbol(symbol);
    }
    return symbol.toUpperCase();
  },
};
