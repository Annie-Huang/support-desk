import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ticketService from './ticketService';
import authService from '../auth/authService';

const initialState = {
  tickets: [],
  ticket: {}, // current ticket
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Register new user
export const createTicket = createAsyncThunk(
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

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {},
});

export const { reset } = ticketSlice.actions;

export default ticketSlice.reducer;
