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
import deleteUserReducer from "./deleteUser";
import userDetailsReducer from "./userDetails";
import updateUserReducer from "./updateUser";
import deleteProductReducer from "./deleteProduct";
import createProductReducer from "./createProduct";
import updateProductReducer from "./updateProduct";
import orderListReducer from "./orderList";
import orderDeliverReducer from "./orderDeliver";

const store = configureStore({
    reducer: { orderDeliver: orderDeliverReducer, orderList: orderListReducer, updateProduct: updateProductReducer, createProduct: createProductReducer, deleteProduct: deleteProductReducer, updateUser: updateUserReducer, userDetails: userDetailsReducer, deleteUser: deleteUserReducer, orderPay: orderPayReducer, auth: authReducer, products: productsReducer, productbyId: productByIdReducer, cart: cartReducer, orderCreate: orderCreateReducer, orderDetail: orderDetailReducer, myOrders: myOrdersReducer, users: usersReducer }
});


export default store;