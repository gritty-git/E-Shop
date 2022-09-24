import { createSlice } from "@reduxjs/toolkit";

const initialUsersState = { users: [], loading: false };

const UsersSlice = createSlice({
    name: 'users',
    initialState: initialUsersState,
    reducers: {
        usersRequest(state) {

            state.loading = true;
        },
        usersRequestClose(state) {
            state.loading = false;
        },
        usersSuccess(state, action) {

            state.loading = false;
            state.users = action.payload;
        },

    }
});

export const usersActions = UsersSlice.actions;

export default UsersSlice.reducer;