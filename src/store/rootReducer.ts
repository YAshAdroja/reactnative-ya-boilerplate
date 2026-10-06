import { combineReducers, UnknownAction } from '@reduxjs/toolkit';
import authReducer, { logout } from './slices/authSlice';
import userReducer from './slices/userSlice';

const appReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: UnknownAction
) => {
  if (action.type === logout.type) {
    // Reset state on user logout while allowing auth slice to set initial state
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
