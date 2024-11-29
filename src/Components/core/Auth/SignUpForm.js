import React, { useState } from "react";
import HighLightText from "../Homepage/HighLightText";
import { useForm } from "react-hook-form";
import {useDispatch} from "react-redux"
import toast from "react-hot-toast";
import {sendOtp} from "../../../services/operations/AuthApis"
import { useNavigate } from "react-router";
import {setSignUp} from '../../../reducers/slices/authSlice'

const SignUpForm = () => {
  const [accountType,setAccountType]=useState("Student");

  const navigate =useNavigate();
  const dispatch=useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if(data.password!==data.confirmPassword){
      toast.error("passwords do not match");
      return;
    }
    const signUpData={  
    ...data,
      accountType
    }
    dispatch(setSignUp(signUpData));
    dispatch(sendOtp(data.email,navigate))
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Heading Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white">Join the millions learning to code with StudyNotion for free</h1>
        <h3 className="text-lg text-blue-400 mt-2">
          Build skills for today, tomorrow, and beyond.{" "}
          <HighLightText text="Education to future-proof your career" />
        </h3>
      </div>

      <div className='flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max'>
        <button className={`${accountType==="Student"?"bg-richblack-900 text-richblack-5":"bg-transparent text-richblack-200"}py-2 px-5 rounded-full transition-all duration-200`} onClick={()=>setAccountType("Student")}>Student</button>
        <button className={`${accountType==="Instructor"?"bg-richblack-900 text-richblack-5":"bg-transparent text-richblack-200"}py-2 px-5 rounded-full transition-all duration-200`} onClick={()=>setAccountType("Instructor")}>Instructor</button>
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-6"
      >
        {/* names */}

        <div className="mb-6 flex flex-row gap-3">
          <div>
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              First Name
              <input
                type="text"
                id="firstname"
                placeholder="first name"
                {...register("firstname", { required: "name is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.firstname && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.firstname.message}
                </span>
              )}
            </label>
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Last Name
              <input
                type="text"
                id="lastname"
                placeholder="last name"
                {...register("lastname", { required: "name is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.lastname && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.lastname.message}
                </span>
              )}
            </label>
          </div>
        </div>

        {/* Email Field */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-6 flex flex-row gap-3">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Create Password
              <input
                type="password"
                id="password"
                placeholder="enter password"
                {...register("password", { required: "password is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </span>
              )}
            </label>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              confirm Password
              <input
                type="password"
                id="confirmPassword"
                placeholder="confirm Password"
                {...register("confirmPassword", { required: "confirm Password is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </span>
              )}
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md text-lg hover:bg-blue-700 transition-colors"
        >
          sign up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
