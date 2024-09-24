import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState:{
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null
    },
    reducers:{
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state,action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        loginFailure: (state,action) => {
            state.isAuthenticated = false;
            state.loading = false;
            state.error = action.payload;
        },
        logOut : (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.token = null;
        }
    }
});

export const {loginStart, loginSuccess, loginFailure, logOut } = authSlice.actions;

export default authSlice.reducer;