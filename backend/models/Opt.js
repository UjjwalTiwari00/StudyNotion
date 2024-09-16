const mongoose = require("mongoose");

// Define the RatingAndReview schema
const OtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  Otp: {
    type: String,
    required: true,
  },
  CreatedAt: {
    type: Date,
   default:Date.now(),
   expires:5*60,
  },
});

module.exports = mongoose.model("Otp", OtpSchema);
