import { createSlice } from "@reduxjs/toolkit";

const initialOrderPayState = { success: false, loading: false, error: null };

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
        orderPayReset(state) {
            console.log("hereee");
            state = {};
        }

    }
});

export const orderPayActions = orderPay.actions;

export default orderPay.reducer;