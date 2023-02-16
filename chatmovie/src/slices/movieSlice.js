import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieService from "../services/movieService";

const initialState = {
    loading: false,
    loadingDetails: false,
    errors: false,
    movies: [],
    movieDetails: null,
    recommendedMovies: {}
}

export const getHomeList = createAsyncThunk(
    'get/movieshome',
    async () => {
        const listHome = await movieService.getHomeList();
        return listHome;
    }
)

export const getMovieDetails = createAsyncThunk(
    'get/moviedetails',
    async (id) => {
        const movieDetails = await movieService.getMovieDetails(id);
        return movieDetails;
    }
)

export const getRecommendedMovies = createAsyncThunk(
    'get/recommendedmovies',
    async (id) => {
        const recommendedMovies = await movieService.getRecommendedMovies(id);
        return recommendedMovies;
    }
)

export const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        reset: (state) => {
            state.loadingDetails = false;
            state.errors = false;
            state.movieDetails = null;
            state.recommendedMovies = {};
        }
    },
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
            // .addCase(getHomeList.rejected, (state, { payload }) => {
            //     state.loading = false;
            //     state.errors = payload;
            //     state.movies = [];
            // })
            .addCase(getMovieDetails.fulfilled, (state, { payload }) => {
                state.loadingDetails = false;
                state.errors = false;
                state.movieDetails = payload;
            })
            .addCase(getMovieDetails.pending, (state) => {
                state.loadingDetails = true;
                state.errors = false;
            })
            // .addCase(getMovieDetails.rejected, (state, { payload }) => {
            //     state.loadingDetails = false;
            //     state.errors = payload;
            //     state.movieDetails = null;
            // })
            .addCase(getRecommendedMovies.fulfilled, (state, { payload }) => {
                state.recommendedMovies = payload;
                state.loading = false;
                state.errors = false;
            })
            // .addCase(getRecommendedMovies.rejected, (state, { payload }) => {
            //     state.loadingDetails = false;
            //     state.errors = payload;
            //     state.recommendedMovies = {};
            // })
    }
})

export const { reset } = movieSlice.actions;
export default movieSlice.reducer;