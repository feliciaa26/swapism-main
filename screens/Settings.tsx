import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../theme';

const Settings: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <Text style={styles.title}>Settings</Text>
      <TouchableOpacity style={styles.button} onPress={onLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700', color: colors.text },
  button: { marginTop: 12, paddingHorizontal: 16, paddingVertical: 10, backgroundColor: colors.primary, borderRadius: 6 },
  buttonText: { color: colors.surface, fontWeight: '600' },
});

export default Settings;
