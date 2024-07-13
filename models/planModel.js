const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  features: [{ type: String, required: true }],
});

const planModel = mongoose.model("plans", planSchema);

module.exports = planModel;
