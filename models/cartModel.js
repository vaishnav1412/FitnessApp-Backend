const mongoose = require('mongoose')

const { ObjectId } = require('mongodb');
const cartSchema = new mongoose.Schema({
    userId:{
        type:String,
        ref:"user",
        required:true
    },
    user:{
        type:String,
        required:true
    },
    products:[{
        productId:{
            type:String,
            ref:"product",
            required:true
        },
        name:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        quantity:{
            type:String,
            required:true
        },
        stock:{
            type:Number,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        catogory:{
            type:String,
            required:false
        },
       image:{
        type:String,
        required:true
       },
       count:{
        type:Number,
        default:1
       }
    }]


})

module.exports=mongoose.model('cart',cartSchema)