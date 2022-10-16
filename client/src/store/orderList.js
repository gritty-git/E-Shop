import { createSlice } from "@reduxjs/toolkit";

const initialOrderListState = { orders: [] };

const orderListSlice = createSlice({
    name: 'orderList',
    initialState: initialOrderListState,
    reducers: {
        orderListRequest(state) {
            state.loading = true;
        },
        orderListFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        orderListSuccess(state, action) {
            state.loading = false;
            state.orders = action.payload;
        },

    }
});

export const orderListActions = orderListSlice.actions;

export default orderListSlice.reducer;