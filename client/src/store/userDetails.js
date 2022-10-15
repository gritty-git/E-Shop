import { createSlice } from "@reduxjs/toolkit";

const initialUserDetailsState = { user: {} };

const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState: initialUserDetailsState,
    reducers: {
        userDetailsRequest(state) {
            state.loading = true;
        },
        userDetailsSuccess(state, action) {
            state.loading = false;
            state.user = action.payload;
        },
        userDetailsRequestFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        userDetailsReset(state) {
            state = initialUserDetailsState;
        }
    }
});

export const userDetailsActions = userDetailsSlice.actions;

export default userDetailsSlice.reducer;