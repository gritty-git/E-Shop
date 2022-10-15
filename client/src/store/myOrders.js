import { createSlice } from "@reduxjs/toolkit";



const initialMyOrdersState = { orders: [], loading: false, error: null };

const myOrdersSlice = createSlice({
    name: 'myOrders',
    initialState: initialMyOrdersState,
    reducers: {
        myOrdersRequest(state) {

            state.loading = true;
        },
        myOrdersRequestFail(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
        myOrdersSuccess(state, action) {

            state.loading = false;
            state.orders = action.payload;
        },

    }
});

export const myOrdersActions = myOrdersSlice.actions;

export default myOrdersSlice.reducer;