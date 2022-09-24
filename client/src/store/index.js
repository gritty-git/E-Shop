import { configureStore } from "@reduxjs/toolkit";

import authReducer from './auth';
import productsReducer from './products';
import productByIdReducer from "./productById";
import cartReducer from './cart';
import orderCreateReducer from './order';
import orderDetailReducer from './orderDetails';

const store = configureStore({
    reducer: { auth: authReducer, products: productsReducer, productbyId: productByIdReducer, cart: cartReducer, orderCreate: orderCreateReducer, orderDetail: orderDetailReducer }
});


export default store;