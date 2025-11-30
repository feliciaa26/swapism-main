// Backup of the full native app for debugging / later restore
import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import HomeScreen from './screens/Home';
import ProfileScreen from './screens/Profile';
import MessagesScreen from './screens/Messages';
import SwapScreen from './screens/Swap';
import FavouritesScreen from './screens/Favourites';
import ProductScreen from './screens/Product';
import { BottomNavNative } from './components/BottomNav.native';

type Route = 'Home' | 'Product' | 'Swap' | 'Messages' | 'Favourites' | 'Profile';

export default function App() {
  const [route, setRoute] = useState<Route>('Home');
  const [productId, setProductId] = useState<string | null>(null);

  const navigate = (r: Route, params?: any) => {
    setRoute(r);
    if (r === 'Product') setProductId(params?.id ?? '1');
  };

  let ScreenComponent = null;
  try {
    switch (route) {
      case 'Home':
        ScreenComponent = <HomeScreen onNavigate={(r: string, p?: any) => navigate(r as Route, p)} />;
        break;
      case 'Product':
        ScreenComponent = <ProductScreen id={productId ?? undefined} />;
        break;
      case 'Swap':
        ScreenComponent = <SwapScreen />;
        break;
      case 'Messages':
        ScreenComponent = <MessagesScreen />;
        break;
      case 'Favourites':
        ScreenComponent = <FavouritesScreen />;
        break;
      case 'Profile':
        ScreenComponent = <ProfileScreen />;
        break;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error requiring screen for route', route, e);
    throw e;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>{ScreenComponent}</View>
      <SafeAreaView style={styles.bottom}>
        <BottomNavNative onNavigate={(r) => navigate(r as Route)} />
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ bottom: { position: 'absolute', left: 0, right: 0, bottom: 0 } });
