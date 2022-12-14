import { createSlice } from "@reduxjs/toolkit";



const initialOrderCreateState = { order: {}, loading: false, success: false };

const orderSlice = createSlice({
    name: 'orderCreate',
    initialState: initialOrderCreateState,
    reducers: {
        orderCreateRequest(state) {

            state.loading = true;
        },
        orderCreateFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        orderCreateSuccess(state, action) {
            state.success = true;
            state.loading = false;
            state.order = action.payload;
        },

    }
});

export const orderCreateActions = orderSlice.actions;

export default orderSlice.reducer;