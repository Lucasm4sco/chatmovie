import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/authSlice";
import movieSlice from "./slices/movieSlice";
import userSlice from "./slices/userSlice";

export default configureStore({
    reducer: {
        auth: authSlice,
        movies: movieSlice,
        user: userSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      })
});