const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');

const addOrderItems = asyncHandler(async (req, res) => {
    const {
        cartItems,
        shippingAddress,
        totalPrice,
    } = req.body

    if (cartItems && cartItems.length === 0) {
        res.status(400)
        throw new Error('No order items')

    } else {
        const order = new Order({
            orderItems: cartItems,
            user: req.user._id,
            shippingAddress,
            totalPrice,
        })
        console.log(order);
        const createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }
})

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    )

    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

module.exports = { addOrderItems, getOrderById }