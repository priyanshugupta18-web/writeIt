import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  selectedPosts: [],
  editable: { status: false, postId: null },
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
    setEditable: (state, action) => {
      state.editable.status = true;
      state.editable.postId = action.payload;
    },
    clearEditable: (state, action) => {
      state.editable.status = false;
      state.editable.postId = null;
    },
    updateSelectedPost: (state, action) => {
      state.selectedPosts = state.selectedPosts.map((post) =>
        post.$id == action.payload.$id ? action.payload : post,
      );
    },
  },
});

export const {
  setPosts,
  setSelectedPost,
  setEditable,
  setStatus,
  updateSelectedPost,
  clearEditable,
} = postSlice.actions;
export default postSlice.reducer;
