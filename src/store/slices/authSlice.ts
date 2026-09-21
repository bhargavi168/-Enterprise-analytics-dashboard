import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '@/types/auth';

// Read initial state from localStorage
const storedToken = localStorage.getItem('fintech_auth_token');
const storedUserJson = localStorage.getItem('fintech_user');

let initialUser: User | null = null;
if (storedUserJson) {
  try {
    initialUser = JSON.parse(storedUserJson);
  } catch {
    initialUser = null;
  }
}

const initialState: AuthState = {
  user: initialUser,
  token: storedToken,
  isAuthenticated: !!storedToken && !!initialUser,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;

      localStorage.setItem('fintech_auth_token', action.payload.token);
      localStorage.setItem('fintech_user', JSON.stringify(action.payload.user));
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('fintech_user', JSON.stringify(state.user));
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;

      localStorage.removeItem('fintech_auth_token');
      localStorage.removeItem('fintech_user');
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, updateUserProfile, logout } = authSlice.actions;

export default authSlice.reducer;
