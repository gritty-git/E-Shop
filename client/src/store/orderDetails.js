import { createSlice } from "@reduxjs/toolkit";

const initialOrderDetailState = { order: {}, loading: false };

const orderDetail = createSlice({
    name: 'orderDetail',
    initialState: initialOrderDetailState,
    reducers: {
        orderDetailRequest(state) {
            state.loading = true;
        },
        orderDetailRequestClose(state) {
            state.loading = false;
        },
        orderDetailSuccess(state, action) {
            state.loading = false;
            state.order = action.payload;
        },

    }
});

export const orderDetailActions = orderDetail.actions;

export default orderDetail.reducer;