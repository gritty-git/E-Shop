import { createSlice } from "@reduxjs/toolkit";



const initialMyOrdersState = { orders: [], loading: false };

const myOrdersSlice = createSlice({
    name: 'myOrders',
    initialState: initialMyOrdersState,
    reducers: {
        myOrdersRequest(state) {

            state.loading = true;
        },
        myOrdersRequestClose(state) {
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