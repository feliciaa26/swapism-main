import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme';

export default function Messages() {
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <Text style={styles.title}>Messages</Text>
      <Text style={styles.note}>Your chats appear here — tap to open a conversation.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  title: { fontSize: 20, fontWeight: '700', color: colors.text },
  note: { color: colors.text, marginTop: 8 },
});
