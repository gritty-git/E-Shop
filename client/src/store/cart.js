import { createSlice } from "@reduxjs/toolkit";

const cartFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {}

const initialCartState = { cartItems: cartFromStorage, shippingAddress: shippingAddressFromStorage };

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        addItem(state, action) {
            if (state.cartItems.find((x) => x.product === action.payload.product)) {
                state.cartItems = state.cartItems.map((x) => (x.product === action.payload.product) ? action.payload : x);
            } else {
                state.cartItems.push(action.payload);
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        deleteItem(state, action) {
            state.cartItems = state.cartItems.filter((x) => x.product != action.payload);
        },
        saveShippingAddress(state, action) {
            state.shippingAddress = action.payload;

        }

    }
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;