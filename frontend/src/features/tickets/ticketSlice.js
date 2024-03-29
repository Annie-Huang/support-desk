import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ticketService from './ticketService';

const initialState = {
  tickets: [],
  ticket: {}, // current ticket
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new ticket
export const createTicket = createAsyncThunk(
  'tickets/create',
  async (ticketData, thunkAPI) => {
    try {
      // thunkAPI has access to the store state
      const token = thunkAPI.getState().auth.user.token;

      return await ticketService.createTicket(ticketData, token);
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user tickets
export const getTickets = createAsyncThunk(
  'tickets/getAll',
  async (_, thunkAPI) => {
    try {
      // thunkAPI has access to the store state
      const token = thunkAPI.getState().auth.user.token;

      return await ticketService.getTickets(token);
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user ticket
export const getTicket = createAsyncThunk(
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

// Close ticket
export const closeTicket = createAsyncThunk(
  'tickets/close',
  async (ticketId, thunkAPI) => {
    try {
      // thunkAPI has access to the store state
      const token = thunkAPI.getState().auth.user.token;

      return await ticketService.closeTicket(ticketId, token);
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
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; // will pass in through thunkAPI.rejectWithValue(message);
      })
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        // console.log('=========== on getTickets.fulfilled', action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets = action.payload;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; // will pass in through thunkAPI.rejectWithValue(message);
        // I add this line just to be safe:
        state.tickets = [];
      })
      .addCase(getTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ticket = action.payload;
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; // will pass in through thunkAPI.rejectWithValue(message);
        // I add this line just to be safe:
        state.ticket = {};
      })
      .addCase(closeTicket.fulfilled, (state, action) => {
        // console.log(
        //   '=========== on closeTicket.fulfilled',
        //   JSON.stringify(state.tickets)
        // );
        state.isLoading = false;
        // There is not guarantee, when a close ticket button is clicked and the page go back to tickets page, which one of the following will happen first.
        //  closeTicket.fulfilled
        //  getTickets.fulfilled
        // If closeTicket.fulfilled happens first, it will try to update a [] tickets array, which does nothing, but getTickets.fulfilled will have the correct info from the server
        // If getTickets.fulfilled happens first, it will have the specific ticket still have status === 'new', so the follow steps will update it.
        // hence it doesn't matter which one happens first. In fact, when I tried it, the order of the fulfilled changes between different clicks
        state.tickets.map((ticket) =>
          ticket._id === action.payload._id
            ? (ticket.status = 'closed')
            : ticket
        );
      });
  },
});

export const { reset } = ticketSlice.actions;

export default ticketSlice.reducer;
