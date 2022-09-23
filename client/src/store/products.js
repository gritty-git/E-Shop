import { createSlice } from "@reduxjs/toolkit";


const initialProductsState = { data: [], loading: false };


const ProductsSlice = createSlice({
    name: 'products',
    initialState: initialProductsState,
    reducers: {
        request(state) {
            state.loading = true;
        },
        success(state, action) {
            state.loading = false;
            state.data = action.payload;
        },

    }
});


export const ProductsActions = ProductsSlice.actions;

export default ProductsSlice.reducer;