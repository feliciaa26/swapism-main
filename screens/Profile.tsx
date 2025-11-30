import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../theme';

export default function Profile({ onOpenMirror, onOpenSettings }: any) {
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <Image source={{ uri: 'https://picsum.photos/id/65/150/150' }} style={styles.avatar} />
      <Text style={styles.name}>Riley Brown</Text>
      <Text style={styles.info}>@rileyB · 10 swaps · 100 followers</Text>

      <TouchableOpacity style={styles.postButton}>
        <Text style={styles.postText}>+ New Post</Text>
      </TouchableOpacity>

      <View style={styles.inlineButtons}>
        <TouchableOpacity onPress={onOpenMirror} style={styles.smallBtn}><Text>Mirror</Text></TouchableOpacity>
        <TouchableOpacity onPress={onOpenSettings} style={styles.smallBtn}><Text>Settings</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 24 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 12 },
  name: { fontSize: 20, fontWeight: '700', color: colors.text },
  info: { color: colors.text, marginTop: 6 },
  postButton: { marginTop: 20, backgroundColor: colors.primary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  postText: { color: colors.surface, fontWeight: '700' },
  inlineButtons: { flexDirection: 'row', marginTop: 16, gap: 12 },
  smallBtn: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: colors.pale, borderRadius: 8, marginHorizontal: 8 },
});
