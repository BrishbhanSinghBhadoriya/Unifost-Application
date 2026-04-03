import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors, Radius, FontSize, FontWeight, Spacing } from '@/constants/theme';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'promo' | 'default' | 'info';
  style?: ViewStyle;
  labelStyle?: TextStyle;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  style,
  labelStyle,
  size = 'md',
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'primary': return { backgroundColor: Colors.primary + '20', borderColor: Colors.primary };
      case 'secondary': return { backgroundColor: Colors.secondary + '20', borderColor: Colors.secondary };
      case 'success': return { backgroundColor: Colors.success + '20', borderColor: Colors.success };
      case 'warning': return { backgroundColor: Colors.warning + '20', borderColor: Colors.warning };
      case 'error': return { backgroundColor: Colors.error + '20', borderColor: Colors.error };
      case 'promo': return { backgroundColor: Colors.accent + '20', borderColor: Colors.accent };
      case 'info': return { backgroundColor: '#3B82F620', borderColor: '#3B82F6' };
      default: return { backgroundColor: Colors.background, borderColor: Colors.border };
    }
  };

  const getLabelColor = () => {
    switch (variant) {
      case 'primary': return Colors.primary;
      case 'secondary': return Colors.secondary;
      case 'success': return Colors.success;
      case 'warning': return Colors.warning;
      case 'error': return Colors.error;
      case 'promo': return Colors.accent;
      case 'info': return '#3B82F6';
      default: return Colors.textSecondary;
    }
  };

  return (
    <View style={[styles.base, size === 'sm' && styles.sm, getVariantStyle(), style]}>
      <Text style={[styles.label, size === 'sm' && styles.smLabel, { color: getLabelColor() }, labelStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.sm,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  sm: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  label: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
  },
  smLabel: {
    fontSize: 10,
  },
});
