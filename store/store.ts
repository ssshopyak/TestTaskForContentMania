import {combineReducers, configureStore} from '@reduxjs/toolkit';
import postListSlice from './postSlice';

const rootReducer = combineReducers({
  postSlice: postListSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
