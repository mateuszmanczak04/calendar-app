import { createSlice } from '@reduxjs/toolkit';

const dateSlice = createSlice({
  name: 'date',
  initialState: {
    currentDate: new Date(localStorage.currentDate) || new Date(),
  },
  reducers: {
    setCurrentDate: (state, action) => {
      localStorage.currentDate = action.payload.date.toString();
      return {
        ...state,
        currentDate: action.payload.date,
      };
    },
    goDayAhead: (state, action) => {
      const newDate = new Date(state.currentDate);
      newDate.setDate(newDate.getDate() + 1);
      localStorage.currentDate = newDate.toString();
      return { ...state, currentDate: newDate };
    },
    goDayBack: (state, action) => {
      const newDate = new Date(state.currentDate);
      newDate.setDate(newDate.getDate() - 1);
      localStorage.currentDate = newDate.toString();
      return { ...state, currentDate: newDate };
    },
    goWeekAhead: (state, action) => {
      const newDate = new Date(state.currentDate);
      newDate.setDate(newDate.getDate() + 7);
      localStorage.currentDate = newDate.toString();
      return { ...state, currentDate: newDate };
    },
    goWeekBack: (state, action) => {
      const newDate = new Date(state.currentDate);
      newDate.setDate(newDate.getDate() - 7);
      localStorage.currentDate = newDate.toString();
      return { ...state, currentDate: newDate };
    },
    goMonthAhead: (state, action) => {
      const newDate = new Date(state.currentDate);
      newDate.setMonth(newDate.getMonth() + 1);
      localStorage.currentDate = newDate.toString();
      return { ...state, currentDate: newDate };
    },
    goMonthBack: (state, action) => {
      const newDate = new Date(state.currentDate);
      newDate.setMonth(newDate.getMonth() - 1);
      localStorage.currentDate = newDate.toString();
      return { ...state, currentDate: newDate };
    },
  },
});

export const getCurrentDate = (state: { date: { currentDate: Date } }): Date =>
  state.date.currentDate;

export const getDateAfter = (date: Date, amountOfDays: number) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + amountOfDays);
  return newDate;
};
export const getDateBefore = (date: Date, amountOfDays: number) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() - amountOfDays);
  return newDate;
};

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
