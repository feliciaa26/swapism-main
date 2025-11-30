import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import colors from '../theme';

const Splash: React.FC = () => {
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <View style={styles.logoWrap}>
        <Text style={styles.logo}>SWAPISM</Text>
      </View>
      <Text style={styles.sub}>Swap. Share. Style.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logoWrap: { padding: 24, backgroundColor: colors.primary, borderRadius: 16 },
  logo: { fontSize: 34, fontWeight: '900', color: colors.surface, letterSpacing: 1 },
  sub: { marginTop: 16, color: colors.text },
});

export default Splash;
