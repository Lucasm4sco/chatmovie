import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    profiles: {},
    error: null
}

const profilesSlice = createSlice({
    name: 'profiles',
    initialState,
    reducers: {
        setProfile: (state, { payload }) => {
            const { id: userId } = payload;
            state.profiles[userId] = payload
        }
    }
});

export default profilesSlice.reducer