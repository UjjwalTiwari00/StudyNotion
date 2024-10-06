const bcrypt = require("bcrypt");
// signup user
const User = require("../models/User");
const OTP = require("../models/Opt");
const OtpGenerator = require("opt-generator");
const jwt = require("jsonwebtoken");
require("dotenv").config;

exports.SignUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      accountType,
      confirmPassword,
      contactNumber,
      otp,
    } = req.body;
    // validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(402).json({
        success: false,
        message: "all field are required",
      });
    }
    // password match
    if (password !== confirmPassword) {
      return res.status(402).json({
        success: false,
        message: "password does not match confirm password",
      });
    }
    // check the user exits or not
    // find the user email in database
    const existingUser = await User.findOne({ email });
    // if user exists send back the response
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // find most recent otp stored for the user
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(recentOtp);
    // validate otp
    if (recentOtp.length == 0) {
      return res.status(400).json({
        success: false,
        message: "otp not found",
      });
    } else if (otp !== recentOtp.otp) {
      return res.status(402).json({
        success: false,
        message: "invalid otp",
      });
    }

    // hash the password
    let HashPassword;
    try {
      HashPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      console.error("Error hashing password:", error);
      return res.status(500).json({
        success: false,
        message: "Error while hashing password",
      });
    }

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });
    // register the user
    const RegisterUser = new User.create({
      firstName,
      lastName,
      password: HashPassword,
      email,
      accountType,
      contactNumber,
      additionalDetails: profileDetails,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: Registration,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      success: false,
      message: "User cannot be register",
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({
        success: false,
        message: "User doesnot exists",
      });
    }

    //ak payload banao
   
    const payload = {
      emsil: userExist.email,
      id: userExist._id,
      role: userExist.accountType,
    };
    if (await bcrypt.compare(password, User.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      User.token = token;
      User.password = undefined;
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        User,
        message: "logged in suucessfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "password is incorrect",
      });
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      success: false,
      message: "User cannot login",
    });
  }
};

exports.SendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const UserExist = await User.findOne({ email });

    if (UserExist) {
      return res.status(401).json({
        success: false,
        message: "User already exists",
      });
    }
    var otp = OtpGenerator.genarate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("otp generator", otp);

    // check unique otp or not
    const result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = OtpGenerator.genarate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    //create the entry for otp
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    res.status(200).json({
      success: true,
      message: "otp sent successfully",
      otp,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      success: false,
      message: "otp cannot be sent",
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { Password, ConfirmPassword } = req.body;
    if (Password !== ConfirmPassword) {
      return res.status(401).json({
        success: false,
        message: "password not matching confirm password",
      });
    }
    const user = await User.findOne({ email });
    
    const hashedPassword=await bcrypt.hash(Password,10);

    user.password=hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while changing the password",
    });
  }
};
