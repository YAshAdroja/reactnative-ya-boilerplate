import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector } from '../store/hooks';
import { colors } from '../theme';

// Auth screens
import LoginScreen from '../screens/Auth/LoginScreen';

// Authenticated: Users Directory screens (existing — unchanged)
import HomeScreen from '../screens/Home/HomeScreen';
import DetailsScreen from '../screens/Details/DetailsScreen';
import UserFormScreen from '../screens/Form/UserFormScreen';

// Drawer + Tabs
import DrawerNavigator from './DrawerNavigator';

/**
 * RootStackParamList is extended in src/types/index.ts.
 * AuthStack and MainStack are kept separate so auth screens never
 * flash behind authenticated content.
 */

// --------------- Auth Stack ---------------
type AuthStackParamList = {
  Login: undefined;
};

// --------------- Main Stack ---------------
// Keeps the Users Directory screens (Home, Details, Form) accessible
// from inside the authenticated area alongside DrawerNavigator.
export type MainStackParamList = {
  /** DrawerNavigator wraps BottomTabs + Profile + Settings */
  DrawerRoot: undefined;
  /** Existing Users Directory screens — preserved as-is */
  Home: undefined;
  Details: { id: number | string };
  Form: { user?: import('../types').User } | undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();

/** Auth flow — only Login for now. // TODO: Add Register, ForgotPassword screens here. */
const AuthNavigator: React.FC = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
  </AuthStack.Navigator>
);

/** Authenticated flow — Drawer + Tabs + Users Directory stack */
const MainNavigator: React.FC = () => (
  <MainStack.Navigator
    initialRouteName="DrawerRoot"
    screenOptions={{
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor: colors.white,
      headerTitleStyle: { fontWeight: '600' },
      contentStyle: { backgroundColor: colors.background },
    }}
  >
    {/* Drawer wraps BottomTabs + Profile + Settings */}
    <MainStack.Screen
      name="DrawerRoot"
      component={DrawerNavigator}
      options={{ headerShown: false }}
    />

    {/* Existing Users Directory screens — navigate to these from Tab1/HomeScreen */}
    <MainStack.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: 'Users Directory' }}
    />
    <MainStack.Screen
      name="Details"
      component={DetailsScreen}
      options={{ title: 'User Details' }}
    />
    <MainStack.Screen
      name="Form"
      component={UserFormScreen}
      options={({ route }) => ({
        title: route.params?.user ? 'Edit User' : 'Add New User',
      })}
    />
  </MainStack.Navigator>
);

/**
 * AppNavigator — Root navigator.
 *
 * Auth Guard:
 *   isAuthenticated = false → AuthNavigator (Login)
 *   isAuthenticated = true  → MainNavigator  (Drawer → Tabs → Users Directory)
 *
 * BootSplash is hidden in App.tsx once PersistGate finishes rehydration.
 *
 * // TODO: Add deep-link configuration in NavigationContainer linking prop.
 */
export const AppNavigator: React.FC = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
