import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";
import messageSlice from "./slices/messageSlice";

export default configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        message: messageSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      })
});