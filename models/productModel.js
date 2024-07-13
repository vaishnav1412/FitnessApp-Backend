const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    sellingPrice:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        required:true
    }
    ,
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
        required:true
    },
   image:{
    type:String,
    required:true
   },
   isBlock:{
    type:Number,
    default:0
   }
})



const productModel = mongoose.model('products',productSchema)

module.exports=productModel