import { createSlice } from "@reduxjs/toolkit";

const initialDeleteProductState = {};

const deleteProductSlice = createSlice({
    name: 'deleteProduct',
    initialState: initialDeleteProductState,
    reducers: {
        deleteProductRequest(state) {

            state.loading = true;
        },
        deleteProductFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        deleteProductSuccess(state, action) {
            state.success = true;
            state.loading = false;
            //state.order = action.payload;
        },

    }
});

export const deleteProductActions = deleteProductSlice.actions;

export default deleteProductSlice.reducer;