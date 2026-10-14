import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { ScreenWrapper } from '../../components';
import {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
} from '../../theme';

/**
 * SettingsScreen — App settings placeholder.
 *
 * Currently shows demo toggles only.
 *
 * // TODO: Connect real settings to MMKV storage via mmkvStorage helpers.
 * // TODO: Add push notification permission toggle.
 * // TODO: Add language/locale selector.
 * // TODO: Add theme switch (light/dark).
 * // TODO: Replace version string dynamically (react-native-device-info or DeviceInfo).
 */
export const SettingsScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [analyticsEnabled, setAnalyticsEnabled] = React.useState(false);

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'TODO: Implement cache clearing via MMKV or AsyncStorage.',
    );
  };

  return (
    <ScreenWrapper edges={['left', 'right', 'bottom']} keyboardAvoiding={false}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* General */}
        <Text style={styles.sectionTitle}>General</Text>
        <View style={styles.card}>
          <SettingRow
            label="Push Notifications"
            description="Receive alerts and updates"
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
          <View style={styles.divider} />
          <SettingRow
            label="Analytics"
            description="Help improve the app"
            value={analyticsEnabled}
            onValueChange={setAnalyticsEnabled}
          />
        </View>

        {/* Storage */}
        <Text style={styles.sectionTitle}>Storage</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.rowInfo}>
              <Text style={styles.rowLabel}>Clear Cache</Text>
              <Text style={styles.rowDescription}>Remove temporary data</Text>
            </View>
            <Text style={styles.actionText} onPress={handleClearCache}>
              Clear
            </Text>
          </View>
        </View>

        {/* About */}
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>App Name</Text>
            {/* TODO: Replace with real app name */}
            <Text style={styles.rowValue}>YA Boilerplate</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Version</Text>
            {/* TODO: Replace with dynamic version from package.json or react-native-device-info */}
            <Text style={styles.rowValue}>1.0.0</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Environment</Text>
            <Text style={[styles.rowValue, styles.envBadge]}>Development</Text>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

interface SettingRowProps {
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const SettingRow: React.FC<SettingRowProps> = ({
  label,
  description,
  value,
  onValueChange,
}) => (
  <View style={styles.row}>
    <View style={styles.rowInfo}>
      <Text style={styles.rowLabel}>{label}</Text>
      {description ? (
        <Text style={styles.rowDescription}>{description}</Text>
      ) : null}
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: colors.border, true: colors.primary }}
      thumbColor={colors.white}
      accessibilityLabel={`Toggle ${label}`}
    />
  </View>
);

const styles = StyleSheet.create({
  scroll: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  sectionTitle: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    ...shadows.small,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  rowInfo: {
    flex: 1,
    marginRight: spacing.sm,
  },
  rowLabel: {
    ...typography.body,
    color: colors.text,
  },
  rowDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  rowValue: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  actionText: {
    ...typography.caption,
    color: colors.error,
    fontWeight: '600',
  },
  envBadge: {
    color: colors.success,
    fontWeight: '600',
  },
});

export default SettingsScreen;
