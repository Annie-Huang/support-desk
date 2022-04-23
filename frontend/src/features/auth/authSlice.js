import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from '../counter/counterAPI';

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// The name ('auth/register') can be anything, not need to match api
export const incrementAsync = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    console.log(user);
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default authSlice.reducer;
