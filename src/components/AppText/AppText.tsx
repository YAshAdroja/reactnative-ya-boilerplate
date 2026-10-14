import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { colors, typography } from '../../theme';

export type AppTextVariant = 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'button';

export interface AppTextProps {
  children: React.ReactNode;
  variant?: AppTextVariant;
  style?: TextStyle | TextStyle[];
  color?: string;
  numberOfLines?: number;
  accessibilityLabel?: string;
}

/**
 * AppText — Unified typography component.
 * Wraps React Native Text with design-system variants from theme.
 */
export const AppText: React.FC<AppTextProps> = ({
  children,
  variant = 'body',
  style,
  color,
  numberOfLines,
  accessibilityLabel,
}) => {
  return (
    <Text
      style={[styles[variant], color ? { color } : undefined, style]}
      numberOfLines={numberOfLines}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: { ...typography.h1, color: colors.text },
  h2: { ...typography.h2, color: colors.text },
  h3: { ...typography.h3, color: colors.text },
  body: { ...typography.body, color: colors.text },
  caption: { ...typography.caption, color: colors.textSecondary },
  button: { ...typography.button, color: colors.text },
});

export default AppText;
