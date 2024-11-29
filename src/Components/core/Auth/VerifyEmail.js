import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { signupUser } from "../../../services/operations/AuthApis";

const VerifyEmail = () => {
  const {signupData}=useSelector((state)=>state.auth)
    const [otp,setOtp]=useState('');
    const dispatch=useDispatch();
    const navigate=useNavigate();
   
    useEffect(()=>{
        if(!signupData){
            navigate('/signup')
        }
       console.log(signupData)
    })
    console.log(signupData)
    const {firstname,lastname,email,password,confirmPassword,accountType}=signupData;
    
    
    const formHandler=(e)=>{
        e.preventDefault();
        dispatch(signupUser(navigate,firstname,lastname,email,password,confirmPassword,accountType,otp))
    }
  return (
    <div>
      <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
        Verify Email
      </h1>
      <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
        A verification code has been sent to you. Enter the code below
      </p>
      <form className='flex flex-col items-center gap-4 mt-4' onSubmit={formHandler}>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderInput={(props) => (
            <input
              type="password"
              {...props}
              placeholder="-"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
            />
          )}
          containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
        />
         <button type='submit' className='mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 w-[50%]'>Verify Email</button>
      </form>
    </div>
  );
};

export default VerifyEmail;
