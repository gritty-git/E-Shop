import { createSlice } from "@reduxjs/toolkit";


const initialProductCreateReviewState = {};


const ProductCreateReviewSlice = createSlice({
    name: 'productCreateReview',
    initialState: initialProductCreateReviewState,
    reducers: {
        request(state) {
            state.loading = true;
        },
        success(state) {
            state.loading = false;
            state.success = true;

        },
        failure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        reset(state) {
            state = initialProductCreateReviewState;
        }

    }
});


export const ProductCreateReviewActions = ProductCreateReviewSlice.actions;

export default ProductCreateReviewSlice.reducer;