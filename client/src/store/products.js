import { createSlice } from "@reduxjs/toolkit";


const initialProductsState = { data: [], loading: false, error: null };


const ProductsSlice = createSlice({
    name: 'products',
    initialState: initialProductsState,
    reducers: {
        request(state) {
            state.loading = true;
        },
        success(state, action) {
            state.loading = false;
            state.data = action.payload.products;
            state.pages = action.payload.pages;
            state.page = action.payload.page;
        },
        failure(state, action) {
            state.loading = false;
            state.error = action.payload;
        }

    }
});


export const ProductsActions = ProductsSlice.actions;

export default ProductsSlice.reducer;