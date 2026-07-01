import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import postReducer from "./postSlice";
import imageReducer from "./imageSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        image:imageReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;