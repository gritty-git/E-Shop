import { createSlice } from "@reduxjs/toolkit";

const initialOrderDeliverState = {};

const orderDeliverSlice = createSlice({
    name: 'orderDeliver',
    initialState: initialOrderDeliverState,
    reducers: {
        orderDeliverRequest(state) {
            state.loading = true;
        },
        orderDeliverFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        orderDeliverSuccess(state, action) {
            state.loading = false;
            state.success = true;
        },
        orderDeliverReset(state) {
            state = initialOrderDeliverState;
        }

    }
});

export const orderDeliverActions = orderDeliverSlice.actions;

export default orderDeliverSlice.reducer;