import { createSlice } from "@reduxjs/toolkit";

const initialCreateProductState = {};

const createProductSlice = createSlice({
    name: 'createProduct',
    initialState: initialCreateProductState,
    reducers: {
        createProductRequest(state) {

            state.loading = true;
        },
        createProductFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        createProductSuccess(state, action) {
            state.success = true;
            state.loading = false;
            state.product = action.payload;
        },
        createProductReset(state) {
            state = initialCreateProductState
        }

    }
});

export const createProductActions = createProductSlice.actions;

export default createProductSlice.reducer;