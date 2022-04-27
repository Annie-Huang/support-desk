import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import noteService from './noteService';
import ticketService from '../tickets/ticketService';

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get user ticket
export const getNotes = createAsyncThunk(
  'tickets/get',
  async (ticketId, thunkAPI) => {
    try {
      // thunkAPI has access to the store state
      const token = thunkAPI.getState().auth.user.token;

      return await ticketService.getTicket(ticketId, token);
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {},
});

export const { reset } = noteSlice.actions;

export default noteSlice.reducer;
