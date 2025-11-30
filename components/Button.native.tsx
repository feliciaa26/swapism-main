import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  fullWidth?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export const ButtonNative: React.FC<ButtonProps> = ({ children, variant = 'primary', fullWidth = false, onPress, style }) => {
  const variantStyle = styles[variant] || styles.primary;

  return (
    <Pressable onPress={onPress} style={[styles.base, variantStyle, fullWidth && styles.full, style]}>
      <Text style={styles.text}>{children as any}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: { backgroundColor: '#9abeaa' },
  secondary: { backgroundColor: '#ffd75c' },
  outline: { borderWidth: 2, borderColor: '#9abeaa', backgroundColor: 'transparent' },
  text: { color: '#111', fontWeight: '600' } as TextStyle,
  full: { alignSelf: 'stretch' },
});

export default ButtonNative;
