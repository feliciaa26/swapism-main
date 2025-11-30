import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

type Props = {
  id?: string;
};

export default function Product({ id }: Props) {
  const productId = id ?? '1';

  return (
    <View style={styles.container}>
      <Image source={{ uri: `https://picsum.photos/id/445/300/400` }} style={styles.img} />
      <Text style={styles.title}>Product {productId}</Text>
      <Text style={styles.desc}>This is a native view of the product detail.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  img: { width: '100%', height: 300 },
  title: { fontSize: 20, fontWeight: '700', padding: 12 },
  desc: { paddingHorizontal: 12, color: '#666' },
});
