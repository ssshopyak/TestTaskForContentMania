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
  'fetchPosts',
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

export const deleteServerPost = createAsyncThunk(
  'deleteServerPost',
  async (postId: number) => {
    const response = await apiClient.deleteServersPost({postId});
    if (response.kind === 'success') {
      console.log('200OK');
    } else {
      throw 'Error fetching users';
    }
  },
);

export const sendPosts = createAsyncThunk(
  'sendPosts',
  async ({title, bodyText}: {title: string; bodyText: string}) => {
    const response = await apiClient.sendPost({title, bodyText});
    if (response.kind === 'success') {
      console.log('200OK');
    } else {
      throw 'Error fetching users';
    }
  },
);

export const updatePosts = createAsyncThunk(
  'updatePosts',
  async ({
    title,
    bodyText,
    postId,
  }: {
    title: string;
    bodyText: string;
    postId: number;
  }) => {
    const response = await apiClient.updateServersPost({
      title,
      bodyText,
      postId,
    });
    if (response.kind === 'success') {
      console.log('200OK');
    } else {
      throw 'Error fetching users';
    }
  },
);

const postListSlice = createSlice({
  name: 'postList',
  initialState: initialState,
  reducers: {
    deletePost: (state, action) => {
      const newPosts = state.posts.filter(post => post.id !== action.payload);
      state.posts = newPosts;
    },
    createPost: (state, action) => {
      state.posts.map((post, index) => {
        if (index === state.posts.length - 1) {
          let lastId = post.id;
          state.posts.push({...action.payload, id: lastId + 1});
        }
      });
    },
    updatePost: (state, action) => {
      state.posts.map((post, index) => {
        if (post.id === action.payload.id) {
          state.posts[index] = {
            id: post.id,
            body: action.payload.body,
            title: action.payload.title,
          };
        }
      });
    },
  },
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

export const {deletePost, createPost, updatePost} = postListSlice.actions;

export default postListSlice.reducer;
