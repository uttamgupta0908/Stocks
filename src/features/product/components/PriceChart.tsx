import React from 'react';
import { View, Dimensions, Text, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { TimeSeriesResponse } from '../../../shared/types/stocks.types';

interface PriceChartProps {
    data: TimeSeriesResponse | undefined;
}

import { useColorScheme } from 'nativewind';

export const PriceChart = ({ data }: PriceChartProps) => {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    if (!data || !data['Time Series (Daily)']) {
        return (
            <View className="h-56 justify-center items-center">
                <Text className="text-slate-500 dark:text-slate-400">No chart data available</Text>
            </View>
        );
    }

    const timeSeries = data['Time Series (Daily)'];
    const dates = Object.keys(timeSeries).slice(0, 30).reverse(); // Last 30 days
    const prices = dates.map((date) => parseFloat(timeSeries[date]['4. close']));

    if (prices.length === 0) return null;

    return (
        <View>
            <LineChart
                data={{
                    labels: dates.filter((_, i) => i % 5 === 0).map(d => d.slice(5)),
                    datasets: [{ data: prices }],
                }}
                width={Dimensions.get('window').width - 32}
                height={220}
                yAxisLabel="$"
                yAxisInterval={1}
                chartConfig={{
                    backgroundColor: isDark ? '#1E293B' : '#ffffff',
                    backgroundGradientFrom: isDark ? '#1E293B' : '#ffffff',
                    backgroundGradientTo: isDark ? '#1E293B' : '#ffffff',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
                    labelColor: (opacity = 1) => isDark ? `rgba(148, 163, 184, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: '4',
                        strokeWidth: '2',
                        stroke: '#6366F1',
                    },
                    propsForBackgroundLines: {
                        stroke: isDark ? '#334155' : '#e2e8f0',
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
                withInnerLines={true}
                withOuterLines={false}
            />
        </View>
    );
};
