import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { Colors, Radius, FontSize, FontWeight, Spacing } from '@/constants/theme';

interface ButtonProps {
  label?: string;
  title?: string; // for compatibility
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  labelStyle,
  icon,
  fullWidth = false,
}) => {
  const displayLabel = label || title || '';

  const getVariantStyle = () => {
    switch (variant) {
      case 'secondary': return { backgroundColor: Colors.secondary };
      case 'outline': return { backgroundColor: 'transparent', borderWidth: 1, borderColor: Colors.primary };
      case 'ghost': return { backgroundColor: 'transparent' };
      case 'danger': return { backgroundColor: Colors.error };
      default: return { backgroundColor: Colors.primary };
    }
  };

  const getLabelStyle = () => {
    switch (variant) {
      case 'outline': return { color: Colors.primary };
      case 'ghost': return { color: Colors.primary };
      default: return { color: '#fff' };
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'sm': return { paddingVertical: 8, paddingHorizontal: 16 };
      case 'lg': return { paddingVertical: 16, paddingHorizontal: 32 };
      default: return { paddingVertical: 12, paddingHorizontal: 24 };
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        getVariantStyle(),
        getSizeStyle(),
        fullWidth && { width: '100%' },
        (disabled || loading) && { opacity: 0.5 },
        pressed && { opacity: 0.8 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? Colors.primary : '#fff'} />
      ) : (
        <>
          {icon}
          <Text style={[styles.label, getLabelStyle(), labelStyle]}>{displayLabel}</Text>
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    textAlign: 'center',
  },
});
