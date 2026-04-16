import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle, View } from 'react-native';
import { Colors, Radius, FontSize, FontWeight } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ButtonProps {
  label?: string;
  title?: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'glass';
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
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(scale.value) }],
  }));

  const getGradientColors = () => {
    switch (variant) {
      case 'primary': return Colors.primaryGradient;
      case 'secondary': return Colors.accentGradient;
      case 'danger': return [Colors.error, '#C53030'] as const;
      default: return null;
    }
  };

  const getBorderStyle = () => {
    if (variant === 'outline') return { borderWidth: 1.5, borderColor: Colors.primary };
    if (variant === 'glass') return { borderWidth: 1, borderColor: Colors.glassBorder };
    return null;
  };

  const getBackgroundColor = () => {
    if (variant === 'ghost') return 'transparent';
    if (variant === 'glass') return Colors.glass;
    if (variant === 'outline') return 'transparent';
    if (!getGradientColors()) {
        switch(variant) {
            case 'secondary': return Colors.secondary;
            case 'danger': return Colors.error;
            default: return Colors.primary;
        }
    }
    return 'transparent';
  };

  const getLabelColor = () => {
    if (variant === 'outline' || variant === 'ghost') return Colors.primary;
    if (variant === 'glass') return Colors.white;
    return '#fff';
  };

  const paddingStyle = {
    sm: { paddingVertical: 10, paddingHorizontal: 16 },
    lg: { paddingVertical: 18, paddingHorizontal: 32 },
    md: { paddingVertical: 14, paddingHorizontal: 24 },
  }[size];

  const content = (
    <View style={[styles.content, paddingStyle]}>
      {loading ? (
        <ActivityIndicator color={getLabelColor()} />
      ) : (
        <>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={[styles.label, { color: getLabelColor() }, labelStyle]}>
            {displayLabel}
          </Text>
        </>
      )}
    </View>
  );

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => (scale.value = 0.96)}
      onPressOut={() => (scale.value = 1)}
      disabled={disabled || loading}
      style={[
        styles.base,
        { backgroundColor: getBackgroundColor() },
        getBorderStyle(),
        fullWidth && { width: '100%' },
        (disabled || loading) && { opacity: 0.6 },
        style,
        animatedStyle,
      ]}
    >
      {getGradientColors() ? (
        <LinearGradient
          colors={getGradientColors()!}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          {content}
        </LinearGradient>
      ) : (
        content
      )}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  gradient: {
    width: '100%',
    height: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
  label: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    letterSpacing: 0.5,
  },
});
