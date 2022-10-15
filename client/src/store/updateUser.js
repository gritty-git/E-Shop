import { createSlice } from "@reduxjs/toolkit";

const initialUpdateUserState = { user: {} };

const updateUserSlice = createSlice({
    name: 'updateUser',
    initialState: initialUpdateUserState,
    reducers: {
        updateUserRequest(state) {
            state.loading = true;
        },
        updateUserSuccess(state, action) {
            state.loading = false;
            state.success = true;
        },
        updateUserRequestFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserReset(state) {
            state = initialUpdateUserState;
        }
    }
});

export const updateUserActions = updateUserSlice.actions;

export default updateUserSlice.reducer;