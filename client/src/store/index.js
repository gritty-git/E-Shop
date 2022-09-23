import { configureStore } from "@reduxjs/toolkit";

import authReducer from './auth';
import productsReducer from './products';
import productById from "./productById";

const store = configureStore({
    reducer: { auth: authReducer, products: productsReducer, productbyId: productById }
});


export default store;