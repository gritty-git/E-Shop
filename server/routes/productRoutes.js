const express = require('express');
const router = express.Router();
const { getProducts, getProductById, deleteProduct } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware.js');

router.get('/', getProducts);

router.get('/:id', getProductById)
    .delete('/:id', protect, admin, deleteProduct);

module.exports = router;