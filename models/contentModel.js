const mongoose = require('mongoose')

const contentSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }

})



const contentModel = mongoose.model('contents',contentSchema)

module.exports=contentModel