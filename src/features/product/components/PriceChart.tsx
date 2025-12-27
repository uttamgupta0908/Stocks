import React from 'react';
import { View, Dimensions, Text, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { 
    TimeSeriesResponse, 
    WeeklyTimeSeriesResponse, 
    MonthlyTimeSeriesResponse 
} from '../../../shared/types/stocks.types';

interface PriceChartProps {
    data: TimeSeriesResponse | WeeklyTimeSeriesResponse | MonthlyTimeSeriesResponse | undefined;
}

import { useColorScheme } from 'nativewind';

export const PriceChart = ({ data }: PriceChartProps) => {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    // Extract time series data based on type
    let timeSeries: any = null;
    let dataPoints = 30; // Default number of data points to show

    if (!data) {
        return (
            <View className="h-56 justify-center items-center">
                <Text className="text-slate-500 dark:text-slate-400">No chart data available</Text>
            </View>
        );
    }

    // Check for different time series types
    if ('Time Series (Daily)' in data) {
        timeSeries = data['Time Series (Daily)'];
        dataPoints = 30; // Last 30 days
    } else if ('Weekly Time Series' in data) {
        timeSeries = data['Weekly Time Series'];
        dataPoints = 52; // Last 52 weeks
    } else if ('Monthly Time Series' in data) {
        timeSeries = data['Monthly Time Series'];
        dataPoints = 60; // Last 60 months
    }

    if (!timeSeries) {
        return (
            <View className="h-56 justify-center items-center">
                <Text className="text-slate-500 dark:text-slate-400">No chart data available</Text>
            </View>
        );
    }

    const dates = Object.keys(timeSeries).slice(0, dataPoints).reverse();
    const prices = dates.map((date) => parseFloat(timeSeries[date]['4. close']));

    if (prices.length === 0) return null;

    const startPrice = prices[0];
    const endPrice = prices[prices.length - 1];
    const isGain = endPrice >= startPrice;
const lineColor = () =>
  isGain
    ? 'rgba(43, 166, 92, 1)'   // ultra dark green
    : 'rgba(186, 44, 44, 1)'; // ultra dark red
    // Determine label step based on data points
    const labelStep = dataPoints > 30 ? 10 : 5;

    return (
        <View>
            <LineChart
                data={{
                    labels: dates.filter((_, i) => i % labelStep === 0).map(d => {
                        // Format date labels - show month/day for daily, month for weekly/monthly
                        const dateObj = new Date(d);
                        if (dataPoints > 50) {
                            return `${dateObj.getMonth() + 1}/${dateObj.getFullYear() % 100}`;
                        }
                        return d.slice(5); // MM-DD format
                    }),
                    datasets: [
                        {
                            data: prices,
                            color: lineColor,
                            strokeWidth: 2,
                        },
                    ],
                }}
                width={Dimensions.get('window').width - 32}
                height={220}
                yAxisLabel="$"
                yAxisInterval={Math.max(1, Math.ceil(prices.length / 5))}
                chartConfig={{
                    backgroundColor: 'transparent',
                    backgroundGradientFrom: 'transparent',
                    backgroundGradientTo: 'transparent',
                    decimalPlaces: 2,
                    color: lineColor,
                    labelColor: (opacity = 1) => isDark ? `rgba(148, 163, 184, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: '0',
                        strokeWidth: '0',
                        stroke: 'transparent',
                    },
                    propsForBackgroundLines: {
                        stroke: 'transparent',
                    }
                }}
                bezier
                transparent={true}
                withDots={false}
                withShadow={false}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
                withInnerLines={false}
                withOuterLines={false}
            />
        </View>
    );
};
