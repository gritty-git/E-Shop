import { createSlice } from "@reduxjs/toolkit";

const initialUsersState = { users: [], loading: false, error: null };

const UsersSlice = createSlice({
    name: 'users',
    initialState: initialUsersState,
    reducers: {
        usersRequest(state) {

            state.loading = true;
        },
        usersRequestFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        usersSuccess(state, action) {

            state.loading = false;
            state.users = action.payload;
        },

    }
});

export const usersActions = UsersSlice.actions;

export default UsersSlice.reducer;