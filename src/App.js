import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Header from "./Components/common/Header"
import LoginForm from "./Components/core/Auth/LoginForm";
import SignUpForm from "./Components/core/Auth/SignUpForm";
import VerifyEmail from "./Components/core/Auth/VerifyEmail";
import ForgetPasseord from "./Components/core/Auth/ForgetPasseord";
import { UpdatePassword } from "./Components/core/Auth/UpdatePassword";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/signup" element={<SignUpForm/>}/>
        <Route path="/verify-email" element={<VerifyEmail/>}/>
        <Route path="/forget-password" element={<ForgetPasseord/>}/>
        <Route path="/update-password/:token" element={<UpdatePassword/>}/>
      </Routes>
    </div>
  );
}

export default App;
