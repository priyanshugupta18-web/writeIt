import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  selectedPosts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setSelectedPost: (state, action) => {
      state.selectedPosts.push(action.payload);
    },
    updateSelectedPost: (state, action) => {
      state.selectedPosts = state.selectedPosts.map((post) =>
        post.$id == action.payload.$id ? action.payload : post,
      );
    },
  },
});

export const { setPosts, setSelectedPost, setStatus, updateSelectedPost } =
  postSlice.actions;
export default postSlice.reducer;
