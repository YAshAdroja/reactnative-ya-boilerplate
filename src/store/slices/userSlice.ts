import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState, UserFormValues } from '../../types';
import { userService } from '../../services/api';

const initialState: UserState = {
  users: [],
  selectedUser: null,
  loading: 'idle',
  refreshing: false,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    hasMore: true,
    loadingMore: false,
  },
  error: null,
  searchQuery: '',
};

// Async Thunks
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (
    params: { page?: number; limit?: number; search?: string; isRefresh?: boolean } = {},
    { rejectWithValue }
  ) => {
    try {
      const page = params.page ?? 1;
      const limit = params.limit ?? 10;
      const search = params.search ?? '';
      const response = await userService.getUsers(page, limit, search);
      return {
        ...response,
        page,
        isRefresh: params.isRefresh || page === 1,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch users');
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (id: number | string, { rejectWithValue }) => {
    try {
      const user = await userService.getUserById(id);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch user details');
    }
  }
);

export const addUser = createAsyncThunk(
  'users/addUser',
  async (userData: UserFormValues, { rejectWithValue }) => {
    try {
      const newUser = await userService.createUser(userData);
      return newUser;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add user');
    }
  }
);

export const editUser = createAsyncThunk(
  'users/editUser',
  async (
    { id, userData }: { id: number | string; userData: UserFormValues },
    { rejectWithValue }
  ) => {
    try {
      const updatedUser = await userService.updateUser(id, userData);
      return updatedUser;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to edit user');
    }
  }
);

export const removeUser = createAsyncThunk(
  'users/removeUser',
  async (id: number | string, { rejectWithValue }) => {
    try {
      await userService.deleteUser(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to remove user');
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
    clearUserError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // fetchUsers
    builder.addCase(fetchUsers.pending, (state, action) => {
      const isRefresh = action.meta.arg.isRefresh;
      const isNextPage = (action.meta.arg.page || 1) > 1;

      if (isRefresh) {
        state.refreshing = true;
      } else if (isNextPage) {
        state.pagination.loadingMore = true;
      } else {
        state.loading = 'loading';
      }
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      const { data, hasMore, total, page, isRefresh } = action.payload;

      if (isRefresh || page === 1) {
        state.users = data;
      } else {
        // Prevent duplicate entries
        const existingIds = new Set(state.users.map((u) => String(u.id)));
        const newItems = data.filter((u) => !existingIds.has(String(u.id)));
        state.users = [...state.users, ...newItems];
      }

      state.pagination.page = page;
      state.pagination.hasMore = hasMore;
      state.pagination.total = total;
      state.pagination.loadingMore = false;
      state.refreshing = false;
      state.loading = 'succeeded';
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = 'failed';
      state.refreshing = false;
      state.pagination.loadingMore = false;
      state.error = action.payload as string;
    });

    // fetchUserById
    builder.addCase(fetchUserById.pending, (state) => {
      state.loading = 'loading';
      state.error = null;
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.selectedUser = action.payload;
      state.loading = 'succeeded';
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });

    // addUser
    builder.addCase(addUser.pending, (state) => {
      state.loading = 'loading';
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.users.unshift(action.payload);
      state.loading = 'succeeded';
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });

    // editUser
    builder.addCase(editUser.pending, (state) => {
      state.loading = 'loading';
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      const index = state.users.findIndex((u) => String(u.id) === String(action.payload.id));
      if (index !== -1) {
        state.users[index] = action.payload;
      }
      if (state.selectedUser && String(state.selectedUser.id) === String(action.payload.id)) {
        state.selectedUser = action.payload;
      }
      state.loading = 'succeeded';
    });
    builder.addCase(editUser.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });

    // removeUser
    builder.addCase(removeUser.pending, (state) => {
      state.loading = 'loading';
    });
    builder.addCase(removeUser.fulfilled, (state, action) => {
      state.users = state.users.filter((u) => String(u.id) !== String(action.payload));
      if (state.selectedUser && String(state.selectedUser.id) === String(action.payload)) {
        state.selectedUser = null;
      }
      state.loading = 'succeeded';
    });
    builder.addCase(removeUser.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });
  },
});

export const { setSearchQuery, setSelectedUser, clearUserError } = userSlice.actions;
export default userSlice.reducer;
