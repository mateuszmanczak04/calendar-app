import { createSlice } from '@reduxjs/toolkit';

const dateSlice = createSlice({
  name: 'date',
  initialState: {
    currentDate: new Date().toString(),
  },
  reducers: {
    setCurrentDate: (state, action) => {
      localStorage.currentDate = action.payload.date.toString();
      state.currentDate = action.payload.date.toString();
    },
    goDayAhead: (state) => {
      const newDate = new Date(state.currentDate);
      newDate.setDate(newDate.getDate() + 1);
      state.currentDate = newDate.toString();
    },
    goDayBack: (state) => {
      const newDate = new Date(state.currentDate);
      newDate.setDate(newDate.getDate() - 1);
      state.currentDate = newDate.toString();
    },
    goWeekAhead: (state) => {
      const newDate = new Date(state.currentDate);
      newDate.setDate(newDate.getDate() + 7);
      state.currentDate = newDate.toString();
    },
    goWeekBack: (state) => {
      const newDate = new Date(state.currentDate);
      newDate.setDate(newDate.getDate() - 7);
      state.currentDate = newDate.toString();
    },
    goMonthAhead: (state) => {
      const newDate = new Date(state.currentDate);
      newDate.setMonth(newDate.getMonth() + 1);
      state.currentDate = newDate.toString();
    },
    goMonthBack: (state) => {
      const newDate = new Date(state.currentDate);
      newDate.setMonth(newDate.getMonth() - 1);
      state.currentDate = newDate.toString();
    },
  },
});

export const getCurrentDate = (state: {
  date: { currentDate: string };
}): Date => new Date(state.date.currentDate);

export const {
  setCurrentDate,
  goDayAhead,
  goDayBack,
  goWeekAhead,
  goWeekBack,
  goMonthAhead,
  goMonthBack,
} = dateSlice.actions;
export default dateSlice.reducer;
