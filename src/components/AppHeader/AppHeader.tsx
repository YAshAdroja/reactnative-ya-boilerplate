import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { colors, spacing, typography, shadows } from '../../theme';
import { AppIcon } from '../AppIcon/AppIcon';

export interface AppHeaderProps {
  title: string;
  subtitle?: string;
  /** Show back arrow. Call onBack or navigation.goBack. */
  showBack?: boolean;
  onBack?: () => void;
  /** Optional right-side action icon/text */
  rightAction?: React.ReactNode;
  backgroundColor?: string;
  /** Light or dark status bar text */
  barStyle?: 'light-content' | 'dark-content';
}

/**
 * AppHeader — Reusable top navigation header.
 * Replaces the native stack header where a custom header is preferred.
 */
export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  rightAction,
  backgroundColor = colors.primary,
  barStyle = 'light-content',
}) => {
  const isLight = barStyle === 'light-content';
  const textColor = isLight ? colors.white : colors.text;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar
        barStyle={barStyle}
        {...(Platform.OS === 'android' ? { backgroundColor } : {})}
      />
      <View style={styles.inner}>
        {/* Left — Back Button */}
        <View style={styles.side}>
          {showBack && onBack && (
            <TouchableOpacity
              onPress={onBack}
              style={styles.backBtn}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <AppIcon
                name={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'}
                size={28}
                color={textColor}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Center — Title */}
        <View style={styles.center}>
          <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text
              style={[
                styles.subtitle,
                { color: textColor },
                styles.subtitleOpacity,
              ]}
              numberOfLines={1}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>

        {/* Right — Action */}
        <View style={styles.side}>{rightAction || null}</View>
      </View>
    </View>
  );
};

const STATUS_BAR_HEIGHT =
  Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;

const styles = StyleSheet.create({
  container: {
    paddingTop: STATUS_BAR_HEIGHT,
    ...shadows.small,
    zIndex: 10,
  },
  inner: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
  },
  side: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    ...typography.h3,
    fontSize: 17,
    color: colors.white,
  },
  subtitle: {
    fontSize: 12,
    color: colors.white,
  },
  subtitleOpacity: {
    opacity: 0.75,
  },
  backBtn: {
    padding: spacing.xs,
  },
});

export default AppHeader;
