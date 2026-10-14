import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MainStackParamList } from './AppNavigator';

/**
 * useAppNavigation — Typed hook for the main authenticated stack.
 *
 * Available routes: DrawerRoot | Home | Details | Form
 * // TODO: Add additional screen names to MainStackParamList in AppNavigator.tsx as you expand the app.
 */
export type AppNavigationProp = NativeStackNavigationProp<MainStackParamList>;

export const useAppNavigation = () => {
  return useNavigation<AppNavigationProp>();
};

export default useAppNavigation;
