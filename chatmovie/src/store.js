import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/authSlice";
import movieSlice from "./slices/movieSlice";

export default configureStore({
    reducer: {
        auth: authSlice,
        movies: movieSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      })
});