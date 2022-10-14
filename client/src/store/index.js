import { configureStore } from "@reduxjs/toolkit";

import authReducer from './auth';
import productsReducer from './products';
import productByIdReducer from "./productById";
import cartReducer from './cart';
import orderCreateReducer from './order';
import orderDetailReducer from './orderDetails';
import myOrdersReducer from './myOrders';
import usersReducer from './users';
import orderPayReducer from './orderPay';

const store = configureStore({
    reducer: { orderPay: orderPayReducer, auth: authReducer, products: productsReducer, productbyId: productByIdReducer, cart: cartReducer, orderCreate: orderCreateReducer, orderDetail: orderDetailReducer, myOrders: myOrdersReducer, users: usersReducer }
});


export default store;