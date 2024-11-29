const bcrypt = require("bcrypt");
// signup user
const User = require("../models/User");
const OTP = require("../models/Opt");
const OtpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
require("dotenv").config;
const mailSender = require("../utils/mailSender");
const Profile = require("../models/Profile");

// exports.signup = async (req, res) => {
//   try {
//     const {
//       firstName,
//       lastName,
//       email,
//       password,
//       accountType,
//       confirmPassword,
//       contactNumber,
//       otp
//     } = req.body;

//     if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
//       return res.status(403).json({
//           success: false,
//           message: "All fields are required"
//       })
//   }
//     // password match
//     if (password !== confirmPassword) {
//       return res.status(400).json({
//         success: false,
//         message: "password does not match confirm password",
//       });
//     }
//     // check the user exits or not
//     // find the user email in database
//     const existingUser = await User.findOne({ email });
//     // if user exists send back the response
//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists",
//       });
//     }

//     // find most recent otp stored for the user
//     const recentOtp = await OTP.find({ email })
//       .sort({ createdAt: -1 })
//       .limit(1);
//     console.log(recentOtp[0].otp);
//     // validate otp
//     if (recentOtp.length == 0) {
//       return res.status(400).json({
//         success: false,
//         message: "otp not found",
//       });
//     } else if (otp !== recentOtp[0].otp) {
//       return res.status(400).json({
//         success: false,
//         message: "invalid otp",
//       });
//     }

//     // hash the password
//     let HashPassword;
//     try {
//       HashPassword = await bcrypt.hash(password, 10);
//     } catch (error) {
//       console.error("Error hashing password:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Error while hashing password",
//       });
//     }

//     const profileDetails = await Profile.create({
//       gender: null,
//       dateOfBirth: null,
//       about: null,
//       contactNumber: null,
//     });
//     // register the user
//     const RegisterUser = await User.create({
//       firstName,
//       lastName,
//       password: HashPassword,
//       email,
//       accountType,
//       contactNumber,
//       additionalDetails: profileDetails,
//       image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
//     });

//     res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       RegisterUser
//     });
//   } catch (error) {
//     console.error("Server error:", error);
//     res.status(500).json({
//       success: false,
//       message: "User cannot be register.",
//     });
//   }
// };

exports.signup = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp
    } = req.body;
    //validate
    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required okay",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password doesn't match",
      });
    }

    //check user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(recentOtp[0].otp);
    //validate otp
    if (recentOtp.length == 0) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    } else if (otp !== recentOtp[0].otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //CREATE  entry in db
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstname,
      lastname,
      email,
      contactNumber,
      password: hashedPassword,
      accountType,
      approved: true,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/7.x/initials/svg?seed=${firstname} ${lastname}`,
    });
    return res.status(200).json({
      success: true,
      message: "User is registered successfully",
      user,
    });
  } catch (e) {
    console.log(e),
      res.status(500).json({
        success: false,
        message: "User cannot be registered.",
      });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
      console.log({password})
    if (!email || !password) {
     
      return res.status(403).json({
          success: false,
          message: 'Please fill all fields carefully'
      })
  }

    const userExist = await User.findOne({ email }).populate(
      "additionalDetails"
    ).exec();
    // console.log("this is user", {userExist})
    console.log("this is user password", userExist.password)
    if (!userExist) {
      return res.status(400).json({
        success: false,
        message: "User doesnot exists",
      });
    }

    //ak payload banao

    if (await bcrypt.compare(password, userExist.password)) {
      const payload = {
        email: userExist.email,
        id: userExist._id,
        accountType: userExist.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
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
        userExist,
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
    var otp = OtpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("otp generator", otp);

    // check unique otp or not
    const result = await OTP.findOne({ otp: otp });
    console.log("result", result);
    while (result) {
      otp = OtpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    //create the entry for otp
    const otpPayload = { email, otp: otp };
    const otpBody = await OTP.create(otpPayload);
    const mail = mailSender(email, "hello this is otp", otp);
    console.log(otpBody);
    console.log({ mail });

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

    const hashedPassword = await bcrypt.hash(Password, 10);

    user.password = hashedPassword;
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
