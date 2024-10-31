const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

// Define the RatingAndReview schema
const OtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  CreatedAt: {
    type: Date,
   default:Date.now(),
   expires:5*6000,
  },
});


//a fucntion to send email

async function sendVerificationEmail(email,otp){
  try{
    const mailResponse=await mailSender(email,"verification Email",otp);
    console.log("email sent successfully",mailResponse);
  }
  catch(e){
    console.log("error in otp",e);
    throw error;
  }
}
// pre middileware
OtpSchema.pre("save",async function(next){
  await sendVerificationEmail(this.email,this.opt);
  next();
})

module.exports = mongoose.model("OTP", OtpSchema);
