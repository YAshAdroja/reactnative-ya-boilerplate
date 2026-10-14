export const colors = {
  primary: '#0066CC',
  primaryDark: '#004C99',
  primaryLight: '#E6F0FA',
  accent: '#FF9500',
  background: '#F8F9FA',
  surface: '#FFFFFF',
  text: '#1C1C1E',
  textSecondary: '#6C757D',
  textMuted: '#A0A0A0',
  border: '#E5E5EA',
  error: '#FF3B30',
  errorLight: '#FEE2E2',
  success: '#34C759',
  successLight: '#DCFCE7',
  warning: '#FFCC00',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  disabled: '#D1D5DB',
  disabledText: '#9CA3AF',
  cardShadow: 'rgba(0, 0, 0, 0.05)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const fonts = {
  light: 'Nunito-Light',
  regular: 'Nunito-Regular',
  medium: 'Nunito-Medium',
  semiBold: 'Nunito-SemiBold',
  bold: 'Nunito-Bold',
  extraBold: 'Nunito-ExtraBold',
} as const;

export type FontFamily = (typeof fonts)[keyof typeof fonts];

export const typography = {
  h1: {
    fontFamily: fonts.bold,
    fontSize: 28,
    fontWeight: '700' as const,
    color: colors.text,
  },
  h2: {
    fontFamily: fonts.semiBold,
    fontSize: 22,
    fontWeight: '600' as const,
    color: colors.text,
  },
  h3: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
    fontWeight: '600' as const,
    color: colors.text,
  },
  body: {
    fontFamily: fonts.regular,
    fontSize: 15,
    fontWeight: '400' as const,
    color: colors.text,
  },
  caption: {
    fontFamily: fonts.regular,
    fontSize: 13,
    fontWeight: '400' as const,
    color: colors.textSecondary,
  },
  button: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    fontWeight: '600' as const,
  },
};

export const borderRadius = {
  sm: 6,
  md: 10,
  lg: 16,
  round: 9999,
};

export const shadows = {
  small: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
};

export const iconSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  base: 24,
  lg: 28,
  xl: 32,
  xxl: 48,
  hero: 64,
} as const;

export type IconSize = keyof typeof iconSizes | number;

export const theme = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  iconSizes,
  fonts,
};

export type Theme = typeof theme;

export default theme;
