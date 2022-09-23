import { createSlice } from "@reduxjs/toolkit";


const initialProductbyIdState = { data: {}, loading: false };


const ProductbyIdSlice = createSlice({
    name: 'productbyId',
    initialState: initialProductbyIdState,
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


export const ProductbyIdActions = ProductbyIdSlice.actions;

export default ProductbyIdSlice.reducer;