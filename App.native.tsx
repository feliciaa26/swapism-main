import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import BottomNavNative from './components/BottomNav.native';
import colors from './theme';

type RouteName =
  | 'Splash'
  | 'Welcome'
  | 'Login'
  | 'Register'
  | 'Home'
  | 'Product'
  | 'Swap'
  | 'Messages'
  | 'Favourites'
  | 'Profile'
  | 'Mirror'
  | 'Settings'
  | 'Chat';

type StackItem = { name: RouteName; params?: any };

const headerTitles: Record<RouteName, string> = {
  Splash: '',
  Welcome: '',
  Login: 'Login',
  Register: 'Register',
  Home: 'SWAPISM',
  Product: 'Product',
  Swap: 'Swap Requests',
  Messages: 'Messages',
  Favourites: 'Favourites',
  Profile: 'Profile',
  Mirror: 'Mirror',
  Settings: 'Settings',
  Chat: 'Chat',
};

export default function App() {
  const [stack, setStack] = useState<StackItem[]>([{ name: 'Splash' }]);

  const current = stack[stack.length - 1];

  const push = (name: RouteName, params?: any) => setStack((s) => [...s, { name, params }]);
  const replace = (name: RouteName, params?: any) => setStack((s) => [...s.slice(0, -1), { name, params }]);
  const pop = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  const resetTo = (name: RouteName, params?: any) => setStack([{ name, params }]);

  useEffect(() => {
    if (current.name === 'Splash') {
      const t = setTimeout(() => replace('Welcome'), 2000);
      return () => clearTimeout(t);
    }
  }, [current.name]);

  // Lazy require screens to avoid web-only imports executing during bundle
  const renderScreen = () => {
    try {
      switch (current.name) {
        case 'Welcome': {
          const Welcome = require('./screens/Welcome').default;
          return <Welcome onNavigate={(r: string) => push(r as RouteName)} onGuest={() => resetTo('Home')} />;
        }
        case 'Login': {
          const Login = require('./screens/Login').default;
          return <Login onSuccess={() => resetTo('Home')} onRegister={() => push('Register')} />;
        }
        case 'Register': {
          const Register = require('./screens/Register').default;
          return <Register onSuccess={() => resetTo('Home')} onLogin={() => push('Login')} />;
        }
        case 'Home': {
          const Home = require('./screens/Home').default;
          return <Home onNavigate={(r: string, p?: any) => push(r as RouteName, p)} />;
        }
        case 'Product': {
          const Product = require('./screens/Product').default;
          return <Product id={current.params?.id} />;
        }
        case 'Swap': {
          const Swap = require('./screens/Swap').default;
          return <Swap />;
        }
        case 'Messages': {
          const Messages = require('./screens/Messages').default;
          return <Messages onOpenChat={(userId: string) => push('Chat', { userId })} />;
        }
        case 'Chat': {
          const Chat = require('./screens/Chat').default;
          return <Chat userId={current.params?.userId} />;
        }
        case 'Favourites': {
          const Favourites = require('./screens/Favourites').default;
          return <Favourites />;
        }
        case 'Profile': {
          const Profile = require('./screens/Profile').default;
          return <Profile onOpenMirror={() => push('Mirror')} onOpenSettings={() => push('Settings')} />;
        }
        case 'Mirror': {
          const Mirror = require('./screens/Mirror').default;
          return <Mirror />;
        }
        case 'Settings': {
          const Settings = require('./screens/Settings').default;
          return <Settings onLogout={() => resetTo('Welcome')} />;
        }
        case 'Splash': {
          const Splash = require('./screens/Splash').default;
          return <Splash />;
        }
        default:
          return <View />;
      }
    } catch (e) {
      // If a screen import throws, surface the error clearly
      // eslint-disable-next-line no-console
      console.error('Error rendering screen', current.name, e);
      return (
        <View style={styles.center}>
          <Text style={{ color: 'red' }}>Error loading screen: {String(e)}</Text>
        </View>
      );
    }
  };

  const showBottom = ['Home', 'Swap', 'Messages', 'Favourites', 'Profile'].includes(current.name);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={[ 'top', 'bottom' ]}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      {current.name !== 'Splash' && current.name !== 'Welcome' && (
        <View style={styles.header}>
          {stack.length > 1 ? (
            <TouchableOpacity onPress={pop} style={styles.headerLeft}>
              <Text style={styles.headerButton}>{'‹'}</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.headerLeft} />
          )}

          <Text style={[styles.headerTitle, { color: colors.text }]}>{headerTitles[current.name]}</Text>

          <View style={styles.headerRight}>
            {current.name === 'Profile' ? (
              <TouchableOpacity onPress={() => push('Settings')}>
                <Text style={styles.headerButton}>☰</Text>
              </TouchableOpacity>
            ) : (
              <View style={{ width: 28 }} />
            )}
          </View>
        </View>
      )}

      <View style={styles.content}>{renderScreen()}</View>

      {/* Bottom nav */}
      {showBottom && (
        <BottomNavNative
          onNavigate={(r: string) => {
            // clear stack to Home-equivalent and push the selected top-level route
            resetTo(r as RouteName);
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: { height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, borderBottomWidth: 1, borderColor: '#eee' },
  headerLeft: { width: 40 },
  headerRight: { width: 40, alignItems: 'flex-end' },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  headerButton: { fontSize: 20 },
  content: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
