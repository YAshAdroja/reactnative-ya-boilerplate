import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../../components';
import { colors, spacing, typography, borderRadius } from '../../theme';
import { useAppSelector } from '../../store/hooks';

/**
 * Tab1Screen (Home) — First bottom-tab screen.
 *
 * // TODO: Rename this screen and its tab label to match your project.
 * // TODO: Replace placeholder content with real screen content.
 * // TODO: Connect Redux or API data as needed.
 */
export const Tab1Screen: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);

  return (
    <ScreenWrapper edges={['left', 'right', 'bottom']} keyboardAvoiding={false}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.greeting}>
            Welcome{user?.name ? `, ${user.name.split(' ')[0]}` : ''}! 👋
          </Text>
          <Text style={styles.screenLabel}>Home Screen</Text>
          <Text style={styles.hint}>
            {/* TODO: Replace with your home screen content */}
            This is Tab 1 — Home. Replace this placeholder with your content.
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
  greeting: {
    ...typography.h2,
    color: colors.primary,
    marginBottom: spacing.xs,
    textAlign: 'center',
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

export default Tab1Screen;
