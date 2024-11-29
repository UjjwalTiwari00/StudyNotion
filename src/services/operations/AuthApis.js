import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";
import { endpoints } from "../apis";
import { setToken } from "../../reducers/slices/authSlice";
import { setUser } from "../../reducers/slices/profileSlice";
const { SENDOTP_API, SIGNUP_API, LOGIN_API,RESETPASSTOKEN_API,RESETPASSWORD_API } = endpoints;

export function signupUser(
  navigate,
  firstname,
  lastname,
  email,
  password,
  confirmPassword,
  accountType,
  otp
) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstname,
        lastname,
        email,
        password,
        confirmPassword,
        accountType,
        otp,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      navigate("/login");
      toast.success("Account Created Successfully");
    } catch (err) {
      console.log("Signup Error it is", err);
      toast.error(err.response.data.message);
    }
  };
}

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", SENDOTP_API, { email });
      if (!response.data.success) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }
      toast.success("Otp sent successfully");
      navigate("/verify-email");
    } catch (e) {
      console.log(" Error", e);
      toast.error(e.response.data.message);
      navigate("/login");
    }
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("this is response", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Login Succesfull");
      dispatch(setToken(response.data.token));

      const userImage = response.data?.user?.image
        ? response.data.userExist.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.userExist.firstname} ${response.data.userExist.lastname}`;

      dispatch(setUser({ ...response.data.userExist, image: userImage }));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.userExist));
      navigate("./dashboard-myprofile");
    } catch (e) {
      console.log(" Error", e);
      toast.error(e.response.data.message);
      navigate("/login");
    }
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}

export function resendPasswordToken(email,SetSendemail){
  return async (dispatch)=>{
    try{
      const response = await apiConnector("POST",RESETPASSTOKEN_API,{email});
      if(response.data.success){
        toast.success("email sent")
        SetSendemail(false);
      }
      else{
        throw new Error(response.data.message);
      }

    }catch(e){
      console.log(" Error", e);
      toast.error(e.response.data.message);
    }
  }
}

export function updatenewPassword(token,newPassword,confirmNewPassword,navigate){
  return async(dispatch)=>{
    try{
      const response=await apiConnector("POST",RESETPASSWORD_API,{newPassword,confirmNewPassword,token});
      if(response.data.success){
        toast.success("password changed succesfully")
      }
      dispatch(setToken(token));
      navigate("/login");
    }catch(e){
      console.log(" Error", e);
      toast.error(e.response.data.message);
    }
  }
}