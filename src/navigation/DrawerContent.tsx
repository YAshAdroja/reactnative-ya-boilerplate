import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { CustomModal, AppIcon } from '../components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { authService } from '../services/authService';

/**
 * DrawerContent — Custom drawer/menu for the main navigation.
 *
 * Menu Items:
 *   Profile → ProfileScreen
 *   Settings → SettingsScreen
 *   Logout → Clears auth state → LoginScreen
 *
 * // TODO: Add more menu items as needed (e.g. Help, About, Notifications).
 * // TODO: Replace version string dynamically via package.json or react-native-device-info.
 */
export const DrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const [logoutModalVisible, setLogoutModalVisible] = React.useState(false);

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const confirmLogout = async () => {
    setLogoutModalVisible(false);
    try {
      await authService.logout();
    } catch {
      // Silent — we still dispatch logout regardless of server response
    } finally {
      dispatch(logout());
      // Navigation resets automatically via AppNavigator's auth guard
    }
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User Header */}
        <View style={styles.userHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          <Text style={styles.userName} numberOfLines={1}>
            {user?.name ?? 'Demo User'}
          </Text>
          <Text style={styles.userEmail} numberOfLines={1}>
            {user?.email ?? 'demo@example.com'}
          </Text>
        </View>

        {/* Separator */}
        <View style={styles.separator} />

        {/* Menu Items */}
        <View style={styles.menu}>
          <DrawerItem
            label="Home"
            icon={
              <AppIcon
                name="home-outline"
                size={20}
                color={colors.text}
                style={styles.menuIcon}
              />
            }
            onPress={() => props.navigation.navigate('MainTabs')}
          />
          <DrawerItem
            label="Profile"
            icon={
              <AppIcon
                name="person-outline"
                size={20}
                color={colors.text}
                style={styles.menuIcon}
              />
            }
            onPress={() => props.navigation.navigate('Profile')}
          />
          <DrawerItem
            label="Settings"
            icon={
              <AppIcon
                name="settings-outline"
                size={20}
                color={colors.text}
                style={styles.menuIcon}
              />
            }
            onPress={() => props.navigation.navigate('Settings')}
          />
        </View>

        {/* Separator */}
        <View style={styles.separator} />

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          accessibilityRole="button"
          accessibilityLabel="Logout"
        >
          <AppIcon
            name="log-out-outline"
            size={20}
            color={colors.error}
            style={styles.logoutIcon}
          />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* Version Footer */}
        <View style={styles.versionContainer}>
          {/* TODO: Replace version string with dynamic value */}
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <CustomModal
        visible={logoutModalVisible}
        title="Logout"
        description="Are you sure you want to log out of your account?"
        icon={<AppIcon name="log-out-outline" size={32} color={colors.error} />}
        positiveText="Logout"
        negativeText="Cancel"
        onPositivePress={confirmLogout}
        onNegativePress={() => setLogoutModalVisible(false)}
        positiveColor={colors.error}
      />
    </DrawerContentScrollView>
  );
};

interface DrawerItemProps {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
}

const DrawerItem: React.FC<DrawerItemProps> = ({ label, icon, onPress }) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={onPress}
    activeOpacity={0.7}
    accessibilityRole="button"
    accessibilityLabel={label}
  >
    {typeof icon === 'string' ? (
      <Text style={styles.menuIcon}>{icon}</Text>
    ) : (
      icon
    )}
    <Text style={styles.menuLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  userHeader: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
    backgroundColor: colors.primary,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    ...shadows.small,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  userName: {
    ...typography.h3,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  userEmail: {
    ...typography.caption,
    color: colors.white,
    opacity: 0.85,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
  },
  menu: {
    paddingHorizontal: spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.xs,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: spacing.md,
    fontWeight: 'normal',
    ...(Platform.OS === 'ios' ? { fontFamily: 'Apple Color Emoji' } : {}),
  },
  menuLabel: {
    ...typography.body,
    color: colors.text,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.sm,
  },
  logoutIcon: {
    fontSize: 20,
    marginRight: spacing.md,
    fontWeight: 'normal',
    ...(Platform.OS === 'ios' ? { fontFamily: 'Apple Color Emoji' } : {}),
  },
  logoutText: {
    ...typography.body,
    color: colors.error,
    fontWeight: '600',
  },
  versionContainer: {
    padding: spacing.lg,
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  versionText: {
    ...typography.caption,
    color: colors.textMuted,
  },
});

export default DrawerContent;
