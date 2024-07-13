const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    }
})



const workoutModel = mongoose.model('workouts',workoutSchema)

module.exports=workoutModel