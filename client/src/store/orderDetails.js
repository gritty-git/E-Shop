import { createSlice } from "@reduxjs/toolkit";

const initialOrderDetailState = { order: {}, loading: false, error: null };

const orderDetail = createSlice({
    name: 'orderDetail',
    initialState: initialOrderDetailState,
    reducers: {
        orderDetailRequest(state) {
            state.loading = true;
        },
        orderDetailFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        orderDetailSuccess(state, action) {
            state.loading = false;
            state.order = action.payload;
        },

    }
});

export const orderDetailActions = orderDetail.actions;

export default orderDetail.reducer;