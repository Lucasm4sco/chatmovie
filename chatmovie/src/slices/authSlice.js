import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const initialState = {
    user: null,
    error: false,
    loading: false
};

export const getDataStorage = createAsyncThunk(
    'auth/storage',
    async () => {
        const data = await authService.getDataStorage();
        return data;
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state = initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDataStorage.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getDataStorage.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.error = false;
                state.user = payload;
            })
    }
});


export default authSlice.reducer;