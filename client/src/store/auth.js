import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { authenticated: false };

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        signIn(state) {
            state.authenticated = true;
        },
        signOut(state) {
            state.authenticated = false;
        },

    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;