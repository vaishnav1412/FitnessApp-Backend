const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
  }
});

const roomModel = mongoose.model("room", roomSchema);

module.exports = roomModel;