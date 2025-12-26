import React from 'react';
import { View, Text } from 'react-native';

export const ExploreScreen = () => (
    <View className="flex-1 justify-center items-center ">
        <Text>Explore Screen</Text>
    </View>
);

export const WatchlistScreen = () => (
    <View className="flex-1 justify-center items-center">
        <Text>Watchlist Screen</Text>
    </View>
);

export const ProductDetailsScreen = ({ route }: any) => (
    <View className="flex-1 justify-center items-center">
        <Text>Product Details: {route.params?.symbol}</Text>
    </View>
);

export const ViewAllScreen = () => (
    <View className="flex-1 justify-center items-center">
        <Text>View All Screen</Text>
    </View>
);
