import { createSlice } from "@reduxjs/toolkit";

const initialUpdateProductState = { product: {} };

const updateProductSlice = createSlice({
    name: 'updateProduct',
    initialState: initialUpdateProductState,
    reducers: {
        updateProductRequest(state) {

            state.loading = true;
        },
        updateProductFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        updateProductSuccess(state, action) {
            state.success = true;
            state.loading = false;
            state.product = action.payload;
        },
        updateProductReset(state) {
            state = initialUpdateProductState
        }

    }
});

export const updateProductActions = updateProductSlice.actions;

export default updateProductSlice.reducer;