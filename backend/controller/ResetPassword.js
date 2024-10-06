const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
// resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
 try{
     // get email from req body
  const email = req.body.email;
  // check user for this email email validation
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({ success: false, message: "your email is not  verified" });
    }
  //   generate token 
    const token = crypto.randomUUID();
  //   update user by adding token and expiration time 
    const updatedDeatils = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      {
        new: true,
      }
    );
  // create url 
    const url = `http://localhost:5173/update-password/${token}`;
  // send mail containing the url 
    await mailSender(email,"password reset link",
      `password reset link ${url}`
    );
  //   return response 
    return res.json({
      success:true,
      message:'email sent successfully'
    })
 }
 catch(e){
    console.log(e);
    return res.status(500).json({
        success:false,
        message:'something went wrong while sending email',
    })
 }
};


// reset password 

exports.resetPassword=async(req,res)=>{
   try{
     //  data fetch
     const {password,confirmPassword,email}=req.body;
     // validation
   if(password!==confirmPassword){
     return res.json({
       success:false,
       message:'password not matching',
     });
   }
     // get userdetails from db using token
   const userDetails=await User.findOne({token:token});
     // if no entry-invalid token
 if(userDetails){
   return res.json({
     success:false,
     message:'token is invalid',
   })
 }
   // token time check
 if(userDetails.resetPasswordExpires > Date.now()){
   return res.json({
     success:false,
     message:'token is expires',
   })
 }  
 // hash pass
 const hashedPassword=await bcrypt.hash(password,10);
 // password update
 await User.findByIdAndUpdate({token:token},
   {password:hashedPassword},
   {new:true},
 );
 // return response
 return res.status(200).json({
   success:true,
   message:'password reset successful'
 })
   }
   catch(e){
    console.log(error);
    
   }
}