import { storeData, storeToken } from "../utils/storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const initialState = {
    user: null,
    error: false,
    loading: false,
    register: {
        loading: false,
        error: null
    },
    login: {
        loading: false,
        error: null
    }
};

export const getDataStorage = createAsyncThunk(
    'auth/storage',
    async () => {
        const data = await authService.getDataStorage();
        return data;
    }
);

export const Register = createAsyncThunk(
    'auth/register',
    async (data, thunkAPI) => {
        const userData = await authService.Register(data);

        if (userData.errors)
            return thunkAPI.rejectWithValue(userData.errors[0]);

        return userData;
    }
)

export const Login = createAsyncThunk(
    'auth/login',
    async (data, thunkAPI) => {
        const userData = await authService.Login(data);

        if (userData.errors)
            return thunkAPI.rejectWithValue(userData.errors[0]);

        return userData;
    }
)


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
            .addCase(getDataStorage.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.error = false;
                state.user = payload;
            })
            .addCase(getDataStorage.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(Register.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.register.loading = false;
                state.register.error = null;
                storeData('user', payload.user);
                storeToken(payload.token);
            })
            .addCase(Register.pending, (state) => {
                state.register.loading = true;
                state.register.error = false;
            })
            .addCase(Register.rejected, (state, { payload }) => {
                state.user = null;
                state.register.loading = false;
                state.register.error = payload;
            })
            .addCase(Login.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.login.loading = false;
                state.login.error = null;
                storeData('user', payload.user);
                storeToken(payload.token);
            })
            .addCase(Login.pending, (state) => {
                state.login.loading = true;
                state.login.error = null;
            })
            .addCase(Login.rejected, (state, { payload }) => {
                state.login.loading = false;
                state.login.error = payload;
            })
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;