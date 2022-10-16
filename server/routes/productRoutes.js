const express = require('express');
const router = express.Router();
const { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware.js');

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/:id', getProductById)
    .delete('/:id', protect, admin, deleteProduct)
    .put('/:id', protect, admin, updateProduct);


module.exports = router;