import { createDrawerNavigator } from '@react-navigation/drawer';
import { HeaderBackButton } from '@react-navigation/elements';
import React from 'react';
import ProfileScreen from '../screens/Main/ProfileScreen';
import SettingsScreen from '../screens/Main/SettingsScreen';
import { colors } from '../theme';
import BottomTabNavigator from './BottomTabNavigator';
import DrawerContent from './DrawerContent';

/**
 * Drawer Param List — Screens accessible via the drawer menu.
 * // TODO: Add more drawer-accessible screens as needed.
 */
export type DrawerParamList = {
  /** MainTabs hosts all three bottom tabs */
  MainTabs: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const renderDrawerContent = (props: any) => <DrawerContent {...props} />;

/**
 * DrawerNavigator — Wraps the bottom tab navigator inside a drawer.
 *
 * Swipe from the left edge (or programmatic open) to access:
 *   - Profile
 *   - Settings
 *   - Logout (in DrawerContent)
 *
 * The existing Users Directory (Home screen) lives inside MainTabs → Tab1.
 *
 * // TODO: Adjust drawer width, colours, and swipe direction as needed.
 */
export const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={renderDrawerContent}
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.white,
        headerTitleStyle: { fontWeight: '600' },
        drawerStyle: {
          backgroundColor: colors.surface,
          width: '100%',
        },
        drawerType: 'front',
        overlayColor: 'rgba(0,0,0,0.5)',
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={BottomTabNavigator}
        options={{ title: 'Home' }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: 'My Profile',
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              tintColor={colors.white}
              onPress={() => navigation.navigate('MainTabs')}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={({ navigation }) => ({
          title: 'Settings',
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              tintColor={colors.white}
              onPress={() => navigation.navigate('MainTabs')}
            />
          ),
        })}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
