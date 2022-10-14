import { createSlice } from "@reduxjs/toolkit";

const initialOrderPayState = { success: true, loading: false, error: null };

const orderPay = createSlice({
    name: 'orderPay',
    initialState: initialOrderPayState,
    reducers: {
        orderPayRequest(state) {
            state.loading = true;
        },
        orderPayFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        orderPaySuccess(state, action) {
            state.loading = false;
            state.success = true;
        },

    }
});

export const orderPayActions = orderPay.actions;

export default orderPay.reducer;