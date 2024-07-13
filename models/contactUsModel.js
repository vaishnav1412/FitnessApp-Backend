const mongoose = require("mongoose");

const contactusSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  subject: {
    type: [String],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const ContactUsModel = mongoose.model("ContactUs", contactusSchema);

module.exports = ContactUsModel;
