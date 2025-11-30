import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../theme';

const Register: React.FC<{ onSuccess: () => void; onLogin: () => void }> = ({ onSuccess, onLogin }) => {
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={styles.title}>Create Account</Text>
      <TouchableOpacity style={styles.primary} onPress={onSuccess}>
        <Text style={styles.primaryText}>Create Account (placeholder)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tertiary} onPress={onLogin}>
        <Text style={styles.tertiaryText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: '800', color: colors.text, marginBottom: 24 },
  primary: { backgroundColor: colors.primary, paddingVertical: 12, paddingHorizontal: 28, borderRadius: 10 },
  primaryText: { color: colors.surface, fontWeight: '700' },
  tertiary: { marginTop: 12 },
  tertiaryText: { color: colors.text, textDecorationLine: 'underline' },
});

export default Register;
