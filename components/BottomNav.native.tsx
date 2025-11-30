import React from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import colors from '../theme';

export const BottomNavNative: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const navItems: Array<{ name: string; icon: string }> = [
    { name: 'Home', icon: '🏠' },
    { name: 'Swap', icon: '🔁' },
    { name: 'Messages', icon: '💬' },
    { name: 'Favourites', icon: '❤️' },
    { name: 'Profile', icon: '👤' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderTopColor: '#eee' }]}>
      {navItems.map((item) => (
        <Pressable key={item.name} style={styles.button} onPress={() => onNavigate(item.name)}>
          <Text style={styles.icon}>{item.icon}</Text>
          <Text style={styles.label}>{item.name}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
  },
  button: { alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 20 },
  label: { fontSize: 10, marginTop: 2, color: colors.text },
});

export default BottomNavNative;
