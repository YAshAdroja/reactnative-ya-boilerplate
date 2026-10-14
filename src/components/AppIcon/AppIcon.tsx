import React from 'react';
import {
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  TextProps,
  Insets,
  ImageSourcePropType,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import { colors, iconSizes, IconSize } from '../../theme';

/**
 * Registry of supported icon families from react-native-vector-icons.
 */
export const ICON_FAMILIES = {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} as const;

export type IconFamily = keyof typeof ICON_FAMILIES;

/**
 * Centralized Icon Configuration.
 * Update defaults here to reflect project-wide changes.
 */
export const ICON_CONFIG = {
  defaultFamily: 'Ionicons' as IconFamily,
  defaultSize: iconSizes.base,
  defaultColor: colors.text,
  sizes: iconSizes,
} as const;

/**
 * Resolves an IconSize token or custom number into a numeric pixel value.
 */
export const resolveIconSize = (size?: IconSize): number => {
  if (typeof size === 'number') {
    return size;
  }
  if (typeof size === 'string' && size in iconSizes) {
    return iconSizes[size as keyof typeof iconSizes];
  }
  return ICON_CONFIG.defaultSize;
};

export interface AppIconProps extends Omit<TextProps, 'children'> {
  /**
   * Name of the icon (e.g. 'home', 'clipboard-outline', 'settings-outline').
   */
  name: string;

  /**
   * Icon family / set from react-native-vector-icons.
   * @default 'Ionicons'
   */
  family?: IconFamily;

  /**
   * Size of the icon. Can be a predefined theme token ('xs' | 'sm' | 'md' | 'base' | 'lg' | 'xl' | 'xxl' | 'hero')
   * or a numeric pixel value.
   * @default 24 ('base')
   */
  size?: IconSize;

  /**
   * Color of the icon.
   * @default colors.text
   */
  color?: string;

  /**
   * Custom text/glyph style applied to the icon.
   */
  style?: StyleProp<TextStyle>;

  /**
   * Optional wrapper style applied when onPress is provided.
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Optional press handler. When provided, the icon is wrapped in an accessible TouchableOpacity.
   */
  onPress?: () => void;

  /**
   * Disabled state for touch interaction when onPress is provided.
   * @default false
   */
  disabled?: boolean;

  /**
   * Active opacity for touch interaction.
   * @default 0.7
   */
  activeOpacity?: number;

  /**
   * Hit slop area expansion for touch interaction.
   */
  hitSlop?: Insets | number;

  /**
   * Accessibility label for screen readers. Defaults to the icon name.
   */
  accessibilityLabel?: string;

  /**
   * FontAwesome 5/6 solid variant flag.
   */
  solid?: boolean;

  /**
   * FontAwesome 5/6 brand variant flag.
   */
  brand?: boolean;

  /**
   * FontAwesome 5/6 light variant flag.
   */
  light?: boolean;
}

export interface AppIconComponent extends React.FC<AppIconProps> {
  getImageSource: (
    name: string,
    size?: number,
    color?: string,
    family?: IconFamily,
  ) => Promise<ImageSourcePropType>;
  hasIcon: (name: string, family?: IconFamily) => boolean;
}

/**
 * AppIcon — Centralized icon component wrapping react-native-vector-icons.
 *
 * Provides a single point of configuration for icon families, default sizes,
 * theme colors, and touch handling throughout the application.
 */
export const AppIcon: AppIconComponent = (({
  name,
  family = ICON_CONFIG.defaultFamily,
  size,
  color = ICON_CONFIG.defaultColor,
  style,
  containerStyle,
  onPress,
  disabled = false,
  activeOpacity = 0.7,
  hitSlop,
  accessibilityLabel,
  solid,
  brand,
  light,
  ...rest
}: AppIconProps) => {
  const IconComponent = (ICON_FAMILIES[family] ||
    ICON_FAMILIES[ICON_CONFIG.defaultFamily]) as React.ComponentType<any>;

  const resolvedSize = resolveIconSize(size);

  const iconElement = (
    <IconComponent
      name={name}
      size={resolvedSize}
      color={color}
      style={style}
      solid={solid}
      brand={brand}
      light={light}
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel || name}
      {...rest}
    />
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={activeOpacity}
        hitSlop={hitSlop}
        style={containerStyle}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || name}
        accessibilityState={{ disabled }}
      >
        {iconElement}
      </TouchableOpacity>
    );
  }

  return iconElement;
}) as AppIconComponent;

/**
 * Helper to retrieve an icon image source asynchronously (useful for native bars, tabs, or notifications).
 */
export const getIconImageSource = (
  name: string,
  size?: number,
  color?: string,
  family: IconFamily = ICON_CONFIG.defaultFamily,
): Promise<ImageSourcePropType> => {
  const FamilyComponent = (ICON_FAMILIES[family] ||
    ICON_FAMILIES[ICON_CONFIG.defaultFamily]) as any;
  if (typeof FamilyComponent.getImageSource === 'function') {
    return FamilyComponent.getImageSource(
      name,
      size ?? ICON_CONFIG.defaultSize,
      color ?? ICON_CONFIG.defaultColor,
    );
  }
  return Promise.reject(
    new Error(`getImageSource is not available on icon family "${family}"`),
  );
};

/**
 * Helper to check whether an icon glyph exists in the selected family.
 */
export const hasIcon = (
  name: string,
  family: IconFamily = ICON_CONFIG.defaultFamily,
): boolean => {
  const FamilyComponent = (ICON_FAMILIES[family] ||
    ICON_FAMILIES[ICON_CONFIG.defaultFamily]) as any;
  if (typeof FamilyComponent.hasIcon === 'function') {
    return FamilyComponent.hasIcon(name);
  }
  return true;
};

AppIcon.getImageSource = getIconImageSource;
AppIcon.hasIcon = hasIcon;

/**
 * Re-export as Icon for convenience and drop-in compatibility.
 */
export const Icon = AppIcon;
export type { AppIconProps as IconProps };

export default AppIcon;
