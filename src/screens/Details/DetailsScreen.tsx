import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUserById, removeUser } from '../../store/slices/userSlice';
import { Loader, EmptyView, CustomButton } from '../../components';
import { colors, spacing, borderRadius, typography, shadows } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export const DetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params;
  const dispatch = useAppDispatch();

  // Try selecting user directly from existing state list first, or fallback to selectedUser
  const userFromList = useAppSelector((state) =>
    state.users.users.find((u) => String(u.id) === String(id))
  );
  const { selectedUser, loading, error } = useAppSelector((state) => state.users);

  const user = userFromList || selectedUser;

  useEffect(() => {
    if (!userFromList) {
      dispatch(fetchUserById(id));
    }
  }, [id, userFromList, dispatch]);

  const handleEdit = () => {
    if (user) {
      navigation.navigate('Form', { user });
    }
  };

  const handleDelete = () => {
    if (!user) return;
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete ${user.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await dispatch(removeUser(user.id));
            navigation.goBack();
          },
        },
      ]
    );
  };

  if (loading === 'loading' && !user) {
    return <Loader message="Fetching user details..." />;
  }

  if (!user && (error || loading === 'failed')) {
    return (
      <EmptyView
        title="User Not Found"
        description={error || 'Could not load details for this user.'}
        buttonTitle="Go Back"
        onButtonPress={() => navigation.goBack()}
      />
    );
  }

  if (!user) return null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.company}>
          {user.company?.name || 'Independent Client'}
        </Text>
      </View>

      {/* Detail Cards */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Contact Information</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{user.phone}</Text>
        </View>

        {user.website && (
          <>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.label}>Website</Text>
              <Text style={styles.value}>{user.website}</Text>
            </View>
          </>
        )}
      </View>

      {user.address && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Address</Text>
          <Text style={styles.addressText}>
            {[user.address.street, user.address.suite, user.address.city, user.address.zipcode]
              .filter(Boolean)
              .join(', ')}
          </Text>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.actionsGroup}>
        <CustomButton
          title="Edit User Details"
          onPress={handleEdit}
          style={styles.actionButton}
        />
        <CustomButton
          title="Delete User"
          onPress={handleDelete}
          variant="danger"
          style={styles.actionButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    ...shadows.small,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.white,
  },
  name: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  company: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.small,
  },
  cardTitle: {
    ...typography.h3,
    fontSize: 16,
    marginBottom: spacing.md,
    color: colors.primary,
  },
  row: {
    paddingVertical: spacing.xs,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  value: {
    ...typography.body,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
  addressText: {
    ...typography.body,
    color: colors.text,
  },
  actionsGroup: {
    marginTop: spacing.sm,
  },
  actionButton: {
    marginBottom: spacing.sm,
  },
});

export default DetailsScreen;
