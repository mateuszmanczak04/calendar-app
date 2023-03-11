import { configureStore } from '@reduxjs/toolkit';
import dateReducer from './date';

export default configureStore({
  reducer: {
    date: dateReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
