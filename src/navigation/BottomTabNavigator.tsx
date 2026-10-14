import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppIcon } from '../components';
import Tab1Screen from '../screens/Main/Tab1Screen';
import Tab2Screen from '../screens/Main/Tab2Screen';
import Tab3Screen from '../screens/Main/Tab3Screen';
import { colors, typography } from '../theme';

/**
 * Bottom Tab Param List
 * // TODO: Rename tab names to match your project (e.g. 'Feed', 'Search', 'Inbox').
 */
export type BottomTabParamList = {
  Tab1: undefined;
  Tab2: undefined;
  Tab3: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

/**
 * BottomTabNavigator — Three-tab main navigation bar.
 *
 * Tab labels:
 *   Tab1 → Home
 *   Tab2 → Second
 *   Tab3 → Third
 *
 * // TODO: Rename tab labels.
 */
export const BottomTabNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          paddingTop: 4,
        },
        tabBarLabelStyle: {
          ...typography.caption,
          fontSize: 11,
        },
        tabBarIcon: ({
          color,
          size,
          focused,
        }: {
          color: string;
          size: number;
          focused: boolean;
        }) => {
          let iconName = 'home';
          if (route.name === 'Tab1')
            iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Tab2')
            iconName = focused ? 'clipboard' : 'clipboard-outline';
          else if (route.name === 'Tab3')
            iconName = focused ? 'settings' : 'settings-outline';
          return <AppIcon name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/* TODO: Rename tab screens to match your project */}
      <Tab.Screen
        name="Tab1"
        component={Tab1Screen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="Tab2"
        component={Tab2Screen}
        options={{ title: 'Second' }}
      />
      <Tab.Screen
        name="Tab3"
        component={Tab3Screen}
        options={{ title: 'Third' }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
