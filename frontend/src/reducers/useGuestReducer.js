import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "/api/users/6760af10a7805eb1a5c6f022";

export const fetchPosts = createAsyncThunk("guest/fetchPosts", async () => {
  const response = await axios.get(URL);
  return response.data;
});

export const guestSlice = createSlice({
  name: "guest",
  initialState: {
    posts: [], 
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true; 
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload; 
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; 
      });
  },
});

export const selectAllPosts = (state) => state.guest.posts;

export default guestSlice.reducer;
