import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieService from "../services/movieService";

const initialState = {
    loading: false,
    loadingDetails: false,
    movies: [],
    movieDetails: null,
    recommendedMovies: {},
    search: {
        loading: false,
        movies: {},
        query: ''
    }
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

export const getSearchMovies = createAsyncThunk(
    'get/searchmovies',
    async (query) => {
        const foundMovies = await movieService.getSearchMovies(query);
        return foundMovies;
    }
)

export const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        reset: (state) => {
            state.loadingDetails = false;
            state.movieDetails = null;
            state.recommendedMovies = {};  
        },
        setQuerySearch: (state, { payload }) => {
            state.search.query = payload;
        },
        resetSearch: (state) => {
            state.search.movies = {};
            state.search.loading = false;
            state.search.query = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHomeList.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.movies = payload
            })
            .addCase(getHomeList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMovieDetails.fulfilled, (state, { payload }) => {
                state.loadingDetails = false;
                state.movieDetails = payload;
            })
            .addCase(getMovieDetails.pending, (state) => {
                state.loadingDetails = true;
            })
            .addCase(getRecommendedMovies.fulfilled, (state, { payload }) => {
                state.recommendedMovies = payload;
            })
            .addCase(getSearchMovies.fulfilled, (state, { payload }) => {
                state.search.loading = false;
                state.search.movies = payload;
            })
            .addCase(getSearchMovies.pending, (state) => {
                state.search.loading = true;
                state.search.movies = {};
            })
    }
})

export const { reset, setQuerySearch, resetSearch } = movieSlice.actions;
export default movieSlice.reducer;