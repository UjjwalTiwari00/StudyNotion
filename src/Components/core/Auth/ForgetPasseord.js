import React, {  useState } from "react";
import { useDispatch } from "react-redux";
import { resendPasswordToken } from "../../../services/operations/AuthApis";

const ForgetPasseord = () => {
  const dispatch = useDispatch();
  const [sendEmail, SetSendemail] = useState(true);
  const [email, SetEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resendPasswordToken(email, SetSendemail));
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        {sendEmail ? (
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Reset your password
            </h1>
            <p className="text-gray-600 mb-6">
              Have no fear. We'll email you instructions to reset your password.
              If you don’t have access to your email, we can try account
              recovery.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  placeholder="Verify your email"
                  onChange={(e) => {
                    SetEmail(e.target.value);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-200"
              >
                Reset Password
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Check your email
            </h1>
            <p className="text-gray-600 mb-6">
            { ` We have sent the reset email. ${email}`}
            </p>
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-200"
              onClick={() => SetSendemail(true)}
            >
              Resend Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgetPasseord;
