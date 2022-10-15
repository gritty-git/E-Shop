import { createSlice } from "@reduxjs/toolkit";

const initialDeleteUserState = { success: false, loading: false, error: null };

const deleteUserSlice = createSlice({
    name: 'deleteUser',
    initialState: initialDeleteUserState,
    reducers: {
        deleteUserRequest(state) {

            state.loading = true;
        },
        deleteUserRequestFail(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
        deleteUserSuccess(state) {

            state.loading = false;
            state.success = true;
        },

    }
});

export const deleteUserActions = deleteUserSlice.actions;

export default deleteUserSlice.reducer;