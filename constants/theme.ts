export const Colors = {
  primary: '#6C63FF', // Purple
  secondary: '#00D4FF', // Cyan
  accent: '#00D4FF',
  background: '#FFFFFF', // Pure White
  surface: '#F8FAFC', // Very Light Gray
  card: '#FFFFFF', // Card background
  glass: 'rgba(0, 0, 0, 0.05)', // Glass for light background
  glassBorder: 'rgba(0, 0, 0, 0.1)',
  text: '#000000', // Black
  textSecondary: '#000000', // Black
  textLight: '#000000', // Black
  white: '#FFFFFF',
  success: '#10B981',
  successLight: '#10B98114',
  error: '#EF4444',
  errorLight: '#EF444414',
  warning: '#F59E0B',
  warningLight: '#F59E0B14',
  
  gradientStart: '#6C63FF',
  gradientEnd: '#3B32FF',
  darkGradient: ['#F8FAFC', '#F1F5F9'] as const,
  primaryGradient: ['#6C63FF', '#3B32FF'] as const,
  accentGradient: ['#00D4FF', '#0090FF'] as const,
  
  secondaryLight: '#00D4FF14',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
};

export const FontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  '2xl': 28, // Updated H1
  '3xl': 32,
};

export const FontFamily = {
  heading: 'Poppins-Bold',
  subheading: 'Poppins-SemiBold',
  body: 'Inter-Regular',
  bodyMedium: 'Inter-Medium',
};

export const FontWeight = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const Radius = {
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
};
