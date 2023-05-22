import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiClient from './apiClient';

export type Comments = {
  id: number;
  text: string;
  postId: number;
};

export type CommentsListState = {
  comments: Comments[];
  loading: boolean;
  error: any;
  nextPage: number;
};

const initialState: CommentsListState = {
  comments: [],
  loading: false,
  error: true,
  nextPage: 1,
};

export const fetchComments = createAsyncThunk<
  {comments: Comments[]},
  {postId: number}
>('fetchComments', async ({postId}: {postId: number}) => {
  const response = await apiClient.fetchComments({postId});
  if (response.kind === 'success') {
    return {
      comments: response.body ?? [],
    };
  } else {
    throw 'Error fetching users';
  }
});

export const deleteServerComments = createAsyncThunk(
  'deleteServerComments',
  async ({postId, id}: {postId: number; id: number}) => {
    const response = await apiClient.deleteServersComments({postId, id});
    if (response.kind === 'success') {
      console.log('200OK');
    } else {
      throw 'Error fetching users';
    }
  },
);

export const sendComments = createAsyncThunk(
  'sendComments',
  async ({text, postId}: {text: string; postId: number}) => {
    const response = await apiClient.sendComments({text, postId});
    if (response.kind === 'success') {
      console.log('200OK');
    } else {
      throw 'Error fetching users';
    }
  },
);

export const updateComments = createAsyncThunk(
  'updateComments',
  async ({text, id, postId}: {text: string; id: number; postId: number}) => {
    const response = await apiClient.updateServersComments({
      text,
      id,
      postId,
    });
    if (response.kind === 'success') {
      console.log('200OK');
    } else {
      throw 'Error fetching users';
    }
  },
);

const commentsListSlice = createSlice({
  name: 'commentsList',
  initialState: initialState,
  reducers: {
    deleteComment: (state, action) => {
      const newComments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
      state.comments = newComments;
    },
    createComment: (state, action) => {
      state.comments.map((comment, index) => {
        if (index === state.comments.length - 1) {
          let lastId = comment.id;
          state.comments.push({...action.payload, id: lastId + 1});
        }
      });
    },
    updateComment: (state, action) => {
      state.comments.map((comment, index) => {
        if (comment.id === action.payload.id) {
          state.comments[index] = {
            id: comment.id,
            postId: action.payload.postId,
            text: action.payload.text,
          };
        }
      });
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload.comments;
        state.loading = false;
      })
      .addCase(fetchComments.rejected, state => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const {deleteComment, createComment, updateComment} =
  commentsListSlice.actions;

export default commentsListSlice.reducer;
