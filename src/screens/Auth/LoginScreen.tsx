import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { ScreenWrapper, CustomButton, CustomInput } from '../../components';
import {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
} from '../../theme';
import { useAppDispatch } from '../../store/hooks';
import { setCredentials } from '../../store/slices/authSlice';
import { authService } from '../../services/authService';

/**
 * LoginScreen — Authentication entry point.
 *
 * Authentication state is managed exclusively in Redux authSlice (persisted via redux-persist).
 * Zustand is NOT used for auth to maintain a single source of truth.
 *
 * // TODO: Replace authService.login mock with real API credentials.
 * // TODO: Add email/password validation schema (Yup) using src/validation/.
 * // TODO: Add "Forgot Password" and "Sign Up" flows.
 */
export const LoginScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validate = (): boolean => {
    let valid = true;
    if (!email.trim()) {
      setEmailError('Email is required');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError('Enter a valid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const handleSignIn = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await authService.login({
        email: email.trim(),
        password,
      });
      dispatch(setCredentials({ user: response.user, token: response.token }));
      // Navigation is handled automatically via AppNavigator's auth state check
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Sign in failed. Please try again.';
      Alert.alert('Sign In Failed', message);
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setEmail('demo@example.com');
    setPassword('password123');
    setEmailError('');
    setPasswordError('');
  };

  return (
    <ScreenWrapper keyboardAvoiding={false} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo / Brand Area */}
          <View style={styles.brandContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>YA</Text>
            </View>
            <Text style={styles.appName}>YA Boilerplate</Text>
            <Text style={styles.tagline}>React Native Starter Kit</Text>
          </View>

          {/* Login Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Sign In</Text>
            <Text style={styles.cardSubtitle}>
              Use demo@example.com / password123
            </Text>

            <CustomInput
              label="Email Address"
              placeholder="you@example.com"
              value={email}
              onChangeText={v => {
                setEmail(v);
                if (emailError) setEmailError('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              error={emailError}
              accessibilityLabel="Email address input"
            />

            <CustomInput
              label="Password"
              placeholder="Your password"
              value={password}
              onChangeText={v => {
                setPassword(v);
                if (passwordError) setPasswordError('');
              }}
              secureTextEntry
              error={passwordError}
              accessibilityLabel="Password input"
            />

            <CustomButton
              title={loading ? 'Signing in...' : 'Sign In'}
              onPress={handleSignIn}
              loading={loading}
              style={styles.signInButton}
            />

            {/* Quick-fill for demo */}
            <CustomButton
              title="Fill Demo Credentials"
              onPress={fillDemo}
              variant="outline"
              style={styles.demoButton}
              disabled={loading}
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {/* TODO: Replace demo app name */}
              Version 1.0.0
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  brandContainer: {
    alignItems: 'center',
    paddingTop: spacing.xxl + spacing.lg,
    paddingBottom: spacing.xl,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    ...shadows.medium,
  },
  logoText: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.white,
  },
  appName: {
    ...typography.h1,
    fontSize: 26,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  tagline: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.medium,
    marginBottom: spacing.lg,
  },
  cardTitle: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  cardSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  signInButton: {
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  demoButton: {
    marginBottom: spacing.xs,
  },
  footer: {
    alignItems: 'center',
    paddingTop: spacing.sm,
  },
  footerText: {
    ...typography.caption,
    color: colors.textMuted,
  },
});

export default LoginScreen;
