import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Chat: React.FC<{ userId?: string }> = ({ userId }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat</Text>
      <Text style={styles.sub}>Chat with: {userId ?? 'unknown'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700' },
  sub: { marginTop: 8, color: '#666' },
});

export default Chat;
