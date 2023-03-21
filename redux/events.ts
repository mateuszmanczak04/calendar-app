import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type EventType = {
  title: string;
  startTime: number;
  endTime: number;
  _id: string;
  color: string;
  authorEmail: string;
};

export const addEvent = createAsyncThunk(
  'events/addEvent',
  async (event: EventType, thunkAPI) => {
    try {
      const response = await axios.post('/api/add-event', event);
      return response.data.event;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const removeEvent = createAsyncThunk(
  'events/removeEvent',
  async (_id: string, thunkAPI) => {
    try {
      await axios.delete(`/api/remove-event/${_id}`);
      return _id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchAllUserEvents = createAsyncThunk(
  'events/fetchAllUserEvents',
  async (email: string, thunkAPI) => {
    try {
      const response = await axios.get('/api/get-events/' + email);
      const events: EventType[] = response.data.events;
      return events;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async (
    {
      _id,
      title,
      startTime,
      endTime,
    }: {
      _id: string;
      title: string;
      startTime: number;
      endTime: number;
    },
    thunkAPI
  ) => {
    try {
      await axios.put('/api/update-event', {
        _id,
        title,
        startTime,
        endTime,
      });
      return { _id, title, startTime, endTime };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

type InitialStateType = {
  events: EventType[];
  loading: boolean;
  error: string;
};

const initialState: InitialStateType = {
  events: [],
  loading: false,
  error: '',
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add event
    builder.addCase(addEvent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.events.push(action.payload);
      state.error = '';
    });
    builder.addCase(addEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // Remove event
    builder.addCase(removeEvent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.events = state.events.filter((e) => e._id != action.payload);
      state.error = '';
    });
    builder.addCase(removeEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // Fetch all events
    builder.addCase(fetchAllUserEvents.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllUserEvents.fulfilled, (state, action) => {
      state.loading = false;
      state.events = action.payload;
      state.error = '';
    });
    builder.addCase(fetchAllUserEvents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // Update event
    builder.addCase(updateEvent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.events = state.events.map((e) => {
        if (e._id == action.payload._id) {
          return {
            ...e,
            title: action.payload.title,
            startTime: action.payload.startTime,
            endTime: action.payload.endTime,
          };
        }
        return e;
      });
      state.error = '';
    });
    builder.addCase(updateEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default eventsSlice.reducer;
export const getAllUserEvents = (state: { events: { events: EventType[] } }) =>
  state.events.events;
export const getEvents = (state: { events: { events: EventType[] } }) =>
  state.events.events;
