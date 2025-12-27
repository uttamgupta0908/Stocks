import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WatchlistProvider } from './src/features/watchlist/context/WatchlistContext';

import './global.css';
import { RootNavigation } from './src/navigation/RootNavigation';
import { StatusBar } from 'react-native';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (

    <SafeAreaProvider >
      <SafeAreaView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <WatchlistProvider>
            <StatusBar translucent />
            <RootNavigation />
          </WatchlistProvider>
        </QueryClientProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
