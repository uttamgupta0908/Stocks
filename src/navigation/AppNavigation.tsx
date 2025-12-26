import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigation } from './TabNavigation';
import { ProductDetailsScreen } from '../features/product/ProductDetailsScreen';
import { ViewAllScreen } from '../features/viewAll/ViewAllScreen';

export type AppStackParamList = {
    Main: undefined;
    ProductDetails: { id?: string };
    ViewAll: { category?: string };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppNavigation() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerStyle: { backgroundColor: '#FFFFFF' },
                headerTitleStyle: { fontWeight: 'bold' },
                headerTintColor: '#6366F1',
            }}
        >
            <Stack.Screen
                name="Main"
                component={TabNavigation}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="ProductDetails"
                component={ProductDetailsScreen}
                options={{ title: 'Stock Details' }}
            />

            <Stack.Screen
                name="ViewAll"
                component={ViewAllScreen}
                options={({ route }) => ({
                    headerShown: true,
                    title: route.params?.category ?? 'Stocks',
                })}
            />
        </Stack.Navigator>
    );
}
