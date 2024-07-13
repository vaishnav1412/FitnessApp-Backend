const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    day:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    foods:{
        type:String,
        required:true
    },
    catogory:{
        type:String,
        required:true
    }
   
})

const foodModel = mongoose.model('foods',foodSchema)

module.exports=foodModel