const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:false
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isBlock:{
        type:Number,
        default:0
    },
    isAdmin:{
        type:Number,
        default:0
    },
    isPrime:{
        type:Number,
        default:0
    },
    otp:{
        type:String,
        required:false
    },
    isVarified:{
        type:Number,
        default:0
    },
    bmi:{
        type:Number,
        default:0
    },
    image:{
        type:String,
        required:false
    },
    role:{
        type:String,
        required:false
    },
    experience:{
        type:Number,
        required:false
    },
    qulification:{
        type:String,
        required:false
    }
})



const userModel = mongoose.model('users',userSchema)

module.exports = userModel