import { configureStore } from "@reduxjs/toolkit";

import authReducer from './auth';
import productsReducer from './products';
import productByIdReducer from "./productById";
import cartReducer from './cart';

const store = configureStore({
    reducer: { auth: authReducer, products: productsReducer, productbyId: productByIdReducer, cart: cartReducer }
});


export default store;