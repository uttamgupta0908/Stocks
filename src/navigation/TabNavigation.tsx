import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ExploreScreen } from '../features/explore/ExploreScreen';
import { WatchlistScreen } from '../features/watchlist/WatchlistScreen';
import { Search, Star } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

const Tab = createBottomTabNavigator();

export function TabNavigation() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: '#6366F1',
                tabBarInactiveTintColor: isDark ? '#64748B' : '#94A3B8',
                tabBarStyle: {
                    backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
                    borderTopColor: isDark ? '#1E293B' : '#F1F5F9',
                    borderTopWidth: 1,
                    height: 50,
                    paddingBottom: 12,
                    paddingTop: 2,
                    elevation: 10,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -4 },
                    shadowOpacity: 0.05,
                    shadowRadius: 10,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '700',
                    marginTop: -4,
                },
            }}
        >
            <Tab.Screen
                name="Explore"
                component={ExploreScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Search color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Watchlist"
                component={WatchlistScreen}
                options={{

                    tabBarIcon: ({ color, size }) => (
                        <Star color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
