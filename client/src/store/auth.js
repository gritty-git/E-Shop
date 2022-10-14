import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : {}



const initialAuthState = { authenticated: (Object.keys(userInfoFromStorage).length != 0), loading: false, userInfo: userInfoFromStorage, error: null };

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
        signIn(state, action) {
            state.authenticated = true;
            state.loading = false;
            state.userInfo = action.payload;
        },
        signOut(state) {
            state.authenticated = false;
            state.loading = false;
            state.userInfo = {};
        },
        failure(state, action) {
            state.authenticated = false;
            state.loading = false;
            state.error = action.payload;
        }

    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;