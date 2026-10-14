import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenWrapper, AppIcon } from '../../components';
import { colors, spacing, typography, borderRadius } from '../../theme';

/**
 * Tab3Screen (Third Screen) — Third bottom-tab screen.
 *
 * // TODO: Rename this screen and its tab label to match your project.
 * // TODO: Replace placeholder content with real screen content.
 */
export const Tab3Screen: React.FC = () => {
  return (
    <ScreenWrapper edges={['left', 'right', 'bottom']} keyboardAvoiding={false}>
      <View style={styles.container}>
        <View style={styles.card}>
          <AppIcon
            name="settings-outline"
            size={64}
            color={colors.primary}
            style={styles.icon}
          />
          <Text style={styles.screenLabel}>Third Screen</Text>
          <Text style={styles.hint}>
            {/* TODO: Replace with your third tab content */}
            This is Tab 3. Replace this placeholder with your content.
          </Text>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    marginBottom: spacing.md,
  },
  screenLabel: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  hint: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default Tab3Screen;
