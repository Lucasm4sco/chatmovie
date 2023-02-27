import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";
import { removeDataStorage } from "../utils/storage";

const initialState = {
    user: null,
    loading: false,
    friends: [],
    friend_requests: [],
    friend_requests_sent: [],
    favorite_movies: []
}

export const getCurrentProfile = createAsyncThunk(
    'user/currentprofile',
    async (_, thunkAPI) => {
        const userData = await userService.getCurrentProfile();

        if (userData?.errors)
            return thunkAPI.rejectWithValue();

        const userIdStored = await thunkAPI.getState().auth.user?._id;
        const invalidUser = userIdStored && (userIdStored !== userData?._id);
        if (invalidUser)
            return thunkAPI.rejectWithValue();

        await thunkAPI.dispatch(getFavoriteMovies(userIdStored));
        return userData;
    }
)

export const getFavoriteMovies = createAsyncThunk(
    'user/movie',
    async (id = null) => {
        const favoriteMovies = await userService.getFavoriteMovies(id);
        return favoriteMovies
    }
)

export const getFriends = createAsyncThunk(
    'user/friends',
    async () => {
        const friendsData = await userService.getFriends();
        return friendsData;
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCurrentProfile.fulfilled, (state, { payload }) => {
                state.user = payload;
                state.loading = false;
            })
            .addCase(getCurrentProfile.pending, (state) => {
                state.loading = true
            })
            .addCase(getCurrentProfile.rejected, (state) => {
                state.loading = false;
                removeDataStorage()
            })
            .addCase(getFavoriteMovies.fulfilled, (state, { payload }) => {
                state.favorite_movies = payload.movies;
            })
            .addCase(getFriends.fulfilled, (state, { payload }) => {
                state.friends = payload.friends;
                state.friend_requests = payload.friend_requests;
                state.friend_requests_sent = payload.friend_requests_sent;
            })
    }
})

export default userSlice.reducer;