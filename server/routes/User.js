const express=require("express")
const router=express.Router();

const{
    loginUser,
    signup,
    SendOtp,
    changePassword ,
}=require("../controller/Auth")

const {
    resetPasswordToken,
    resetPassword,
  } = require("../controller/ResetPassword")
  
  const { auth } = require("../middlewares/auth");

// Route for user login
router.post("/login", loginUser)

// Route for user signup
router.post("/signup", signup)

// Route for sending OTP to the user's email
router.post("/sendotp", SendOtp)

// Route for Changing the password
router.post("/changepassword", auth, changePassword)

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

// Export the router for use in the main application
module.exports = router