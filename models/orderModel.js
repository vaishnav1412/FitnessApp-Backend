const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    deliveryAddress: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    orderId:{
        type: String,
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "product",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        count: {
            type: Number,
            required: true
        },
        productPrice: {
            type: Number,
            required: true
        },image:{
            type: String,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now 
    },
    status: {
        type: String,
        enum: ['Pending','Placed','Shipped', 'Delivered'], 
        default: 'Pending' 
    }
}, {
    timestamps: true
});

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;
