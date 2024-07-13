const mongoose = require("mongoose");

const users = require("../models/userModel"); 
const plans = require("../models/planModel"); 

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  planId: {type: mongoose.Schema.Types.ObjectId,ref: "plans",required: true},
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  amount: {type:Number,required:true},
  orderId: {type:String,required:true},
  purchaseHistory: [
    {
      purchaseDate: { type: Date, required: true },
      amount: { type: Number, required: true },
      orderId: { type: String, required: true }
    }
  ]
   
});

const subscriptionModel = mongoose.model("subscriptions", subscriptionSchema);
module.exports = subscriptionModel;
