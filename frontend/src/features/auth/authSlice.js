import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from '../counter/counterAPI';
import authService from './authService';

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Register new user
// The name ('auth/register') can be anything, not need to match api
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    // console.log('register, user=', user);

    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  console.log('login, user=', user);
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fullfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.message = action.payload; // will pass in through thunkAPI.rejectWithValue(message);
        state.user = null;
      });
  },
});

export default authSlice.reducer;