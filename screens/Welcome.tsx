import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../theme';

const Welcome: React.FC<{ onNavigate: (route: string) => void; onGuest: () => void }> = ({ onNavigate, onGuest }) => {
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Find, swap and share your style.</Text>

      <TouchableOpacity style={styles.primary} onPress={() => onNavigate('Login')}>
        <Text style={styles.primaryText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondary} onPress={() => onNavigate('Register')}>
        <Text style={styles.secondaryText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.guest} onPress={onGuest}>
        <Text style={styles.guestText}>Continue as Guest</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: '800', color: colors.text, marginBottom: 6 },
  subtitle: { color: colors.text, marginBottom: 24 },
  primary: { backgroundColor: colors.primary, paddingVertical: 14, paddingHorizontal: 36, borderRadius: 10, marginVertical: 6 },
  primaryText: { color: colors.surface, fontWeight: '700' },
  secondary: { backgroundColor: colors.accent, paddingVertical: 12, paddingHorizontal: 28, borderRadius: 10, marginVertical: 6 },
  secondaryText: { color: colors.text, fontWeight: '700' },
  guest: { marginTop: 12 },
  guestText: { color: colors.text, textDecorationLine: 'underline' },
});

export default Welcome;
