import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import CustomButton from '../CustomButton/CustomButton';
import { AppIcon } from '../AppIcon/AppIcon';

export interface ErrorStateProps {
  title?: string;
  description?: string;
  buttonTitle?: string;
  onRetry?: () => void;
  icon?: React.ReactNode;
}

/**
 * ErrorState — Reusable error placeholder UI.
 * Drop-in replacement wherever an API or runtime error needs to be displayed.
 */
export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  buttonTitle = 'Try Again',
  onRetry,
  icon,
}) => {
  return (
    <View style={styles.container}>
      {icon ? (
        typeof icon === 'string' ? (
          <Text style={styles.icon}>{icon}</Text>
        ) : (
          icon
        )
      ) : (
        <AppIcon
          name="alert-circle-outline"
          size="xxl"
          color={colors.error}
          style={styles.icon}
        />
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {onRetry && (
        <CustomButton
          title={buttonTitle}
          onPress={onRetry}
          variant="danger"
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 48,
    marginBottom: spacing.md,
    fontWeight: 'normal',
    ...(Platform.OS === 'ios' ? { fontFamily: 'Apple Color Emoji' } : {}),
  },
  title: {
    ...typography.h3,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  button: {
    minWidth: 140,
  },
});

export default ErrorState;
