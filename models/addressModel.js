const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  addresses: [
    {
      type: {
        type: String,
       
      },
      housename: {
        type: String,
       
      },
      localarea: {
        type: String,
        
      },
      postoffice: {
        type: String,
       
      },
      district: {
        type: String,
       
      },
      pin: {
        type: Number,
        required: true,
      }
    },
  ],
});

const Address = mongoose.model("Address", addressSchema); // Use "Address" as the model name

module.exports = Address;
