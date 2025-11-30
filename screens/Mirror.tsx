import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme';

const Mirror: React.FC = () => {
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <Text style={styles.title}>Mirror</Text>
      <Text style={styles.sub}>Create outfit combos from your posts.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700', color: colors.text },
  sub: { marginTop: 8, color: colors.text },
});

export default Mirror;
