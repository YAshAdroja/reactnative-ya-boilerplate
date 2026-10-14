import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { store, persistor } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import { Loader } from './src/components';
import { colors } from './src/theme';

/**
 * App — Root component.
 *
 * Provider Tree:
 *   GestureHandlerRootView  (required by @react-navigation/drawer)
 *     SafeAreaProvider       (safe area insets)
 *       Provider             (Redux store)
 *         PersistGate        (wait for redux-persist rehydration)
 *           AppNavigator     (auth-guarded navigation)
 *
 * BootSplash:
 *   react-native-bootsplash is configured natively (Android/iOS).
 *   We hide it via RNBootSplash.hide() inside onBeforeLift once
 *   redux-persist has finished rehydrating the auth state.
 *
 * // TODO: Replace Loader fallback with a proper splash/skeleton screen.
 * // TODO: Configure BootSplash splash image/color in android & ios native files.
 *   See: https://github.com/zoontek/react-native-bootsplash
 */
export function App(): React.JSX.Element {
  /**
   * Called by PersistGate just before lifting (rendering children).
   * Use this to hide BootSplash so there is no flash of content.
   * // TODO: Uncomment the BootSplash import and hide call after running:
   *   npx react-native-bootsplash generate <image> --platforms=android,ios
   */
  const handleBeforeLift = useCallback(async () => {
    try {
      // import RNBootSplash from 'react-native-bootsplash';
      // await RNBootSplash.hide({ fade: true });
    } catch {
      // BootSplash not yet configured — safe to ignore in development.
    }
  }, []);

  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaProvider style={styles.container}>
        <Provider store={store}>
          <PersistGate
            loading={<Loader message="Initializing application..." />}
            persistor={persistor}
            onBeforeLift={handleBeforeLift}
          >
            <AppNavigator />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default App;
