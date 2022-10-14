import { createSlice } from "@reduxjs/toolkit";


const initialProductbyIdState = { data: {}, loading: false, error: null };


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
        failure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

    }
});


export const ProductbyIdActions = ProductbyIdSlice.actions;

export default ProductbyIdSlice.reducer;