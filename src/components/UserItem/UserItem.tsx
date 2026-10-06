import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { User } from '../../types';
import { colors, spacing, borderRadius, typography, shadows } from '../../theme';

export interface UserItemProps {
  user: User;
  onPress: (user: User) => void;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}

export const UserItemComponent: React.FC<UserItemProps> = ({
  user,
  onPress,
  onEdit,
  onDelete,
}) => {
  const initial = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.card}
      onPress={() => onPress(user)}
      accessibilityRole="button"
      accessibilityLabel={`View details for ${user.name}`}
    >
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{initial}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {user.name}
        </Text>
        <Text style={styles.email} numberOfLines={1}>
          {user.email}
        </Text>
        <Text style={styles.phone} numberOfLines={1}>
          {user.phone}
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        {onEdit && (
          <TouchableOpacity
            style={[styles.actionBtn, styles.editBtn]}
            onPress={() => onEdit(user)}
            accessibilityRole="button"
            accessibilityLabel={`Edit ${user.name}`}
            hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
          >
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
        )}
        {onDelete && (
          <TouchableOpacity
            style={[styles.actionBtn, styles.deleteBtn]}
            onPress={() => onDelete(user)}
            accessibilityRole="button"
            accessibilityLabel={`Delete ${user.name}`}
            hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
          >
            <Text style={styles.deleteBtnText}>Del</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export const UserItem = memo(UserItemComponent);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    ...shadows.small,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  infoContainer: {
    flex: 1,
    marginRight: spacing.sm,
  },
  name: {
    ...typography.h3,
    fontSize: 16,
    color: colors.text,
  },
  email: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  phone: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginLeft: spacing.xs,
  },
  editBtn: {
    backgroundColor: colors.primaryLight,
  },
  editBtnText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  deleteBtn: {
    backgroundColor: colors.errorLight,
  },
  deleteBtnText: {
    ...typography.caption,
    color: colors.error,
    fontWeight: '600',
  },
});

export default UserItem;

