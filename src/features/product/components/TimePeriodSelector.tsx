import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

interface TimePeriodSelectorProps {
    periods: string[];
    selectedPeriod: string;
    onSelectPeriod: (period: string) => void;
}

export const TimePeriodSelector: React.FC<TimePeriodSelectorProps> = ({
    periods,
    selectedPeriod,
    onSelectPeriod,
}) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
        >
            {periods.map((period) => (
                <TouchableOpacity
                    key={period}
                    onPress={() => onSelectPeriod(period)}
                    className={`px-4 py-2 rounded-full mr-2 ${selectedPeriod === period ? 'bg-primary' : 'bg-gray-100 dark:bg-slate-700'
                        }`}
                    activeOpacity={0.7}
                >
                    <Text
                        className={`text-sm font-semibold ${selectedPeriod === period ? 'text-white' : 'text-gray-700 dark:text-slate-300'
                            }`}
                    >
                        {period}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};
