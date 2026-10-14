import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { MainStackParamList } from '../../navigation/AppNavigator';
import { UserFormValues } from '../../types';
import { userValidationSchema } from '../../validation/userValidation';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addUser, editUser } from '../../store/slices/userSlice';
import { CustomInput, CustomButton } from '../../components';
import { colors, spacing } from '../../theme';

type Props = NativeStackScreenProps<MainStackParamList, 'Form'>;

export const UserFormScreen: React.FC<Props> = ({ route, navigation }) => {
  const existingUser = route.params?.user;
  const isEditMode = !!existingUser;

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.users);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues>({
    resolver: yupResolver(userValidationSchema),
    defaultValues: {
      name: existingUser?.name || '',
      email: existingUser?.email || '',
      phone: existingUser?.phone || '',
    },
  });

  useEffect(() => {
    if (existingUser) {
      reset({
        name: existingUser.name,
        email: existingUser.email,
        phone: existingUser.phone,
      });
    }
  }, [existingUser, reset]);

  const onSubmit = async (data: UserFormValues) => {
    try {
      if (isEditMode && existingUser) {
        await dispatch(
          editUser({ id: existingUser.id, userData: data }),
        ).unwrap();
        Alert.alert('Success', 'User profile updated successfully.');
      } else {
        await dispatch(addUser(data)).unwrap();
        Alert.alert('Success', 'New user created successfully.');
      }
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', error || 'Failed to save user. Please try again.');
    }
  };

  const isSaving = loading === 'loading' || isSubmitting;

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formCard}>
          {/* Name Field */}
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                label="Full Name *"
                placeholder="John Doe"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors.name?.message}
                autoCapitalize="words"
              />
            )}
          />

          {/* Email Field */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                label="Email Address *"
                placeholder="john.doe@example.com"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />

          {/* Phone Field */}
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                label="Phone Number *"
                placeholder="1-770-736-8031"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors.phone?.message}
                keyboardType="phone-pad"
              />
            )}
          />

          {/* Action Buttons */}
          <CustomButton
            title={isEditMode ? 'Update User' : 'Create User'}
            onPress={handleSubmit(onSubmit)}
            loading={isSaving}
            style={styles.submitBtn}
          />

          <CustomButton
            title="Cancel"
            onPress={() => navigation.goBack()}
            variant="outline"
            disabled={isSaving}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
  },
  submitBtn: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
});

export default UserFormScreen;
