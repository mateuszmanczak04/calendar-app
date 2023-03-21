import { createSlice } from '@reduxjs/toolkit';

const editSlice = createSlice({
  name: 'edit',
  initialState: {
    _id: '',
    title: '',
    startTime: 0,
    endTime: 0,
  },
  reducers: {
    setEditedEvent: (state, action) => {
      state._id = action.payload._id;
      state.title = action.payload.title;
      state.startTime = action.payload.startTime;
      state.endTime = action.payload.endTime;
    },
  },
});

export const { setEditedEvent } = editSlice.actions;
export const getEditData = (state: {
  edit: { _id: string; title: string; startTime: number; endTime: number };
}) => state.edit;
export default editSlice.reducer;
