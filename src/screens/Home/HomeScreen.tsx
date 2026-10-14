import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Text,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { User } from '../../types';
import type { MainStackParamList } from '../../navigation/AppNavigator';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchUsers,
  removeUser,
  setSearchQuery,
} from '../../store/slices/userSlice';
import { useDebounce } from '../../hooks/useDebounce';
import {
  UserItem,
  Loader,
  EmptyView,
  CustomInput,
  CustomButton,
} from '../../components';
import { colors, spacing, typography } from '../../theme';

type Props = NativeStackScreenProps<MainStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { users, loading, refreshing, pagination, error } = useAppSelector(
    state => state.users,
  );

  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 400);

  // Fetch users on mount and when debounced search query changes
  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearch));
    dispatch(fetchUsers({ page: 1, search: debouncedSearch, isRefresh: true }));
  }, [debouncedSearch, dispatch]);

  // Pull to refresh handler
  const handleRefresh = useCallback(() => {
    dispatch(fetchUsers({ page: 1, search: debouncedSearch, isRefresh: true }));
  }, [dispatch, debouncedSearch]);

  // Pagination handler (load next page)
  const handleLoadMore = useCallback(() => {
    if (
      !pagination.loadingMore &&
      pagination.hasMore &&
      loading !== 'loading'
    ) {
      const nextPage = pagination.page + 1;
      dispatch(fetchUsers({ page: nextPage, search: debouncedSearch }));
    }
  }, [dispatch, pagination, loading, debouncedSearch]);

  // Navigation handlers
  const handleUserPress = useCallback(
    (user: User) => {
      navigation.navigate('Details', { id: user.id });
    },
    [navigation],
  );

  const handleEditPress = useCallback(
    (user: User) => {
      navigation.navigate('Form', { user });
    },
    [navigation],
  );

  const handleDeletePress = useCallback(
    (user: User) => {
      Alert.alert(
        'Confirm Delete',
        `Are you sure you want to delete ${user.name}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => dispatch(removeUser(user.id)),
          },
        ],
      );
    },
    [dispatch],
  );

  const renderItem = useCallback(
    ({ item }: { item: User }) => (
      <UserItem
        user={item}
        onPress={handleUserPress}
        onEdit={handleEditPress}
        onDelete={handleDeletePress}
      />
    ),
    [handleUserPress, handleEditPress, handleDeletePress],
  );

  const keyExtractor = useCallback((item: User) => String(item.id), []);

  const renderFooter = () => {
    if (!pagination.loadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={colors.primary} />
        <Text style={styles.footerText}>Loading more users...</Text>
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading === 'loading') return null;
    if (error) {
      return (
        <EmptyView
          title="Failed to load users"
          description={error}
          buttonTitle="Try Again"
          onButtonPress={handleRefresh}
        />
      );
    }
    return (
      <EmptyView
        title="No Users Found"
        description={
          searchInput
            ? `No users match "${searchInput}"`
            : 'Tap "Add User" to create the first record.'
        }
        buttonTitle={searchInput ? 'Clear Search' : 'Add User'}
        onButtonPress={
          searchInput
            ? () => setSearchInput('')
            : () => navigation.navigate('Form')
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Search & Add Action Bar */}
      <View style={styles.searchSection}>
        <CustomInput
          placeholder="Search by name, email, or phone..."
          value={searchInput}
          onChangeText={setSearchInput}
          containerStyle={styles.searchInputContainer}
        />
        <CustomButton
          title="+ Add User"
          onPress={() => navigation.navigate('Form')}
          style={styles.addButton}
        />
      </View>

      {/* Main List / Loader */}
      {loading === 'loading' && users.length === 0 ? (
        <Loader message="Fetching users directory..." />
      ) : (
        <FlatList
          data={users}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchSection: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchInputContainer: {
    marginBottom: spacing.xs,
  },
  addButton: {
    marginTop: spacing.xs,
  },
  listContent: {
    padding: spacing.md,
    flexGrow: 1,
  },
  footerLoader: {
    paddingVertical: spacing.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    ...typography.caption,
    marginLeft: spacing.sm,
    color: colors.textSecondary,
  },
});

export default HomeScreen;
