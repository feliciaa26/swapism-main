import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable, TextInput, Dimensions } from 'react-native';
import colors from '../theme';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 12;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;

const MOCK = [
  { id: '1', name: 'Jeans cool and baggy (fit)', image: 'https://picsum.photos/id/445/300/400', rating: '4.3 (12)' },
  { id: '2', name: 'Jeans cool and baggy (fit)', image: 'https://picsum.photos/id/338/300/400', rating: '4.3 (12)' },
  { id: '3', name: 'Jeans cool and baggy (fit)', image: 'https://picsum.photos/id/64/300/400', rating: '4.3 (12)' },
  { id: '4', name: 'Jeans cool and baggy (fit)', image: 'https://picsum.photos/id/200/300/400', rating: '4.3 (12)' },
];

export default function Home({ onNavigate }: { onNavigate?: (route: string, params?: any) => void }) {
  const [query, setQuery] = useState('');
  const [favs] = useState<Record<string, boolean>>({});

  const renderCard = ({ item }: any) => (
    <View style={styles.cardWrap}>
      <Pressable style={styles.card} onPress={() => onNavigate && onNavigate('Product', { id: item.id })}>
        <Image source={{ uri: item.image }} style={styles.img} />
        <Pressable style={styles.heart} onPress={() => { /* toggle favourite */ }}>
          <Text style={{ fontSize: 14 }}>♡</Text>
        </Pressable>
        <View style={styles.cardBody}>
          <Text numberOfLines={2} style={styles.name}>{item.name}</Text>
          <Text style={styles.rating}>User's Rating: {item.rating}</Text>
          <Pressable style={styles.swapBtn} onPress={() => { /* swap action */ }}>
            <Text style={styles.swapText}>Swap Now</Text>
          </Pressable>
        </View>
      </Pressable>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      {/* Header with logo and search */}
      <View style={styles.header}>
        <Text style={styles.logo}>swapism</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="search products..."
          placeholderTextColor="#666"
          style={styles.search}
        />
      </View>

      {/* Illustration/banner */}
      <Image source={{ uri: 'https://picsum.photos/800/240?grayscale=0' }} style={styles.banner} />

      {/* Filter / Sort row */}
      <View style={styles.row}> 
        <Pressable style={styles.rowItem}>
          <Text>Filter</Text>
        </Pressable>
        <View style={{ flex: 1 }} />
        <Pressable style={styles.rowItem}>
          <Text>Sort By</Text>
        </Pressable>
      </View>

      {/* Products grid */}
      <FlatList
        contentContainerStyle={{ padding: CARD_MARGIN }}
        data={MOCK}
        keyExtractor={(i) => i.id}
        renderItem={renderCard}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 12, paddingTop: 18 },
  logo: { fontSize: 20, fontWeight: '800', color: colors.text, marginBottom: 8 },
  search: { backgroundColor: colors.surface, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: '#eee' },
  banner: { height: 140, width: '100%', marginTop: 10 },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: CARD_MARGIN, paddingVertical: 10 },
  rowItem: { paddingHorizontal: 8, paddingVertical: 6, backgroundColor: colors.surface, borderRadius: 8, borderWidth: 1, borderColor: '#eee' },
  cardWrap: { flex: 1, padding: CARD_MARGIN / 2 },
  card: { backgroundColor: colors.surface, borderRadius: 12, overflow: 'hidden' , elevation: 2},
  img: { width: CARD_WIDTH, height: CARD_WIDTH, resizeMode: 'cover' },
  heart: { position: 'absolute', top: 8, right: 8, backgroundColor: colors.surface, padding: 6, borderRadius: 16 },
  cardBody: { padding: 8 },
  name: { fontWeight: '700', color: colors.text, marginBottom: 6 },
  rating: { color: '#666', fontSize: 12, marginBottom: 8 },
  swapBtn: { backgroundColor: colors.primary, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  swapText: { color: colors.surface, fontWeight: '700' },
});
