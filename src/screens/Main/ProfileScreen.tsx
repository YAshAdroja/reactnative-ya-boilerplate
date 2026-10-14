import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { ScreenWrapper, CustomButton } from '../../components';
import {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
} from '../../theme';
import { useAppSelector } from '../../store/hooks';

/**
 * ProfileScreen — Shows authenticated user info (demo data).
 *
 * // TODO: Replace demo user data with real user profile from API.
 * // TODO: Add profile edit capability (navigate to a form screen).
 * // TODO: Add avatar upload.
 */
export const ProfileScreen: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);

  const handleEditProfile = () => {
    // TODO: Navigate to profile edit form
    Alert.alert('Edit Profile', 'TODO: Connect a real profile-edit screen.');
  };

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  const rows: { label: string; value: string }[] = [
    { label: 'Name', value: user?.name ?? 'Demo User' },
    { label: 'Email', value: user?.email ?? 'demo@example.com' },
    { label: 'Phone', value: user?.phone ?? '+1-000-000-0000' },
    { label: 'Company', value: user?.company?.name ?? 'Ya Boilerplate Corp' },
  ];

  return (
    <ScreenWrapper edges={['left', 'right', 'bottom']} keyboardAvoiding={false}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          <Text style={styles.name}>{user?.name ?? 'Demo User'}</Text>
          <Text style={styles.subtitle}>
            {user?.email ?? 'demo@example.com'}
          </Text>
        </View>

        {/* Info Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Profile Information</Text>
          {rows.map((row, index) => (
            <View key={row.label}>
              <View style={styles.row}>
                <Text style={styles.label}>{row.label}</Text>
                <Text style={styles.value}>{row.value}</Text>
              </View>
              {index < rows.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        {/* Actions */}
        <CustomButton
          title="Edit Profile"
          onPress={handleEditProfile}
          variant="outline"
          style={styles.editButton}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scroll: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    ...shadows.medium,
  },
  avatarText: {
    fontSize: 34,
    fontWeight: '700',
    color: colors.white,
  },
  name: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    ...shadows.small,
  },
  cardTitle: {
    ...typography.h3,
    fontSize: 15,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  row: {
    paddingVertical: spacing.sm,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  value: {
    ...typography.body,
    fontWeight: '500',
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  editButton: {
    marginBottom: spacing.sm,
  },
});

export default ProfileScreen;
