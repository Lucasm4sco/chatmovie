import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profilesService from "../services/profilesService";

const initialState = {
    profiles: {},
    error: null
}

export const getUserProfile = createAsyncThunk(
    'profile/user',
    async (id, thunkAPI) => {
        const dataProfile = await profilesService.getUserProfile(id);

        if (dataProfile.errors)
            return thunkAPI.rejectWithValue(dataProfile.errors[0]);

        return dataProfile;

    }
)

const profilesSlice = createSlice({
    name: 'profiles',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getUserProfile.fulfilled, (state, { payload }) => {
            const { _id: userID } = payload
            state.profiles[userID.toString()] = payload
        })
    }
});

export default profilesSlice.reducer