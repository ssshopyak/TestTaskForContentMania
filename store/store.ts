import {combineReducers, configureStore} from '@reduxjs/toolkit';
import commentsListSlice from './commentsSlice';
import postListSlice from './postSlice';

const rootReducer = combineReducers({
  postSlice: postListSlice,
  commentsSlice: commentsListSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
