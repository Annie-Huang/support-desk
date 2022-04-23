import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from '../counter/counterAPI';

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
  extraReducers: (builder) => {},
});

export default authSlice.reducer;
