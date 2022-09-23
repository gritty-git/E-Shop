import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { authenticated: false, loading: false };

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        authRequest(state) {
            state.loading = true;
        },
        authRequestClose(state) {
            state.loading = false;
        },
        signIn(state) {
            state.authenticated = true;
            state.loading = false;
        },
        signOut(state) {
            state.authenticated = false;
            state.loading = false;
        },

    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;