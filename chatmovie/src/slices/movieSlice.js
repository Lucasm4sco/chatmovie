import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieService from "../services/movieService";

const initialState = {
    loading: false,
    errors: false,
    movies: []
}

export const getHomeList = createAsyncThunk(
    'get/movieshome',
    async () => {
        const listHome = await movieService.getHomeList();
        return listHome;
    }
)

export const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHomeList.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.errors = false;
                state.movies = payload
            })
            .addCase(getHomeList.pending, (state) => {
                state.loading = true;
                state.errors = false;
            })
            .addCase(getHomeList.rejected, (state, { payload }) => {
                state.loading = false;
                state.errors = payload;
                state.movies = [];
            })
    }
})

export default movieSlice.reducer;