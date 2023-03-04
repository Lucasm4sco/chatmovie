import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";
import profilesSlice from "./slices/profilesSlice";

export default configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        profiles: profilesSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      })
});