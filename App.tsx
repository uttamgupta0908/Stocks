import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WatchlistProvider } from './src/features/watchlist/context/WatchlistContext';

import './global.css';
import { RootNavigation } from './src/navigation/RootNavigation';

import { useColorScheme } from 'nativewind';
import { View, TouchableOpacity } from 'react-native';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <WatchlistProvider>
          <View className="flex-1 bg-background dark:bg-slate-900">
            <RootNavigation />
          </View>
        </WatchlistProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
