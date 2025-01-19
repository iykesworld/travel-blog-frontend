import { configureStore } from '@reduxjs/toolkit'
import { blogApi } from './features/blog/blogsApi'
import authApi from './features/auth/authApi'
import authReducer from './features/auth/authSlice'
import { commentApi } from "./features/comment/commentApi";

export const store = configureStore({
    reducer: {
      // Add the generated reducer as a specific top-level slice
      [blogApi.reducerPath]: blogApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [commentApi.reducerPath]: commentApi.reducer,
      auth: authReducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(blogApi.middleware, authApi.middleware, commentApi.middleware),
  })
  // console.log("Redux Store Initial State:", store.getState());

 