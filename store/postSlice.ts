import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiClient from './apiClient';

export type Post = {
  id: number;
  title: string;
  body: string;
};

export type PostListState = {
  posts: Post[];
  loading: boolean;
  error: any;
  nextPage: number;
};

const initialState: PostListState = {
  posts: [],
  loading: false,
  error: true,
  nextPage: 1,
};

export const fetchPosts = createAsyncThunk<{posts: Post[]}>(
  'fetchUsers',
  async () => {
    const response = await apiClient.fetchPosts();
    if (response.kind === 'success') {
      return {
        posts: response.body ?? [],
      };
    } else {
      throw 'Error fetching users';
    }
  },
);

const postListSlice = createSlice({
  name: 'postList',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload.posts;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, state => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default postListSlice.reducer;
