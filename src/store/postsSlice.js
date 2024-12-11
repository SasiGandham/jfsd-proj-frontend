import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async action for fetching posts
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ page, size }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://jfsd-backend-project.up.railway.app/api/posts/all`, {
        params: { page, size },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async action for deleting a post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      await axios.delete(`https://jfsd-backend-project.up.railway.app/api/posts/${postId}`);
      return postId; // Return the deleted post's ID
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    page: 0,
    hasMore: true,
    loading: false,
    error: null,
  },
  reducers: {
    resetPosts: (state) => {
      state.posts = [];
      state.hasMore = true;
      state.page = 1;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = [...state.posts, ...action.payload];
        if (action.payload.length === 0) {
          state.hasMore = false;
        }
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { incrementPage,resetPosts } = postsSlice.actions;
export default postsSlice.reducer;
