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
