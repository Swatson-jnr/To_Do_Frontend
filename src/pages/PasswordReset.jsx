import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bg from "../assets/bg.png";
import { toast } from "react-toastify";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState("");
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const inputRefs = useRef([]);
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // navigate("/");

      data.success
        ? toast.success("Email verified successfully")
        : toast.error(data.message);
      data.success && setIsEmailSent(true);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const data = await axios;
      data.success
        ? toast.success("Email verified successfully")
        : toast.error(data.message);
      data.success && navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="bg-[#ff6767] min-h-screen relative flex  items-center justify-center">
      <img
        src={bg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* enter email id */}
      {!isEmailSent && (
        <form
          onSubmit={onSubmitHandler}
          className="bg-white p-8 rounded-lg shadow-lg w-96 text-sm z-10"
        >
          <h1 className="text-gray-800 text-2xl font-  semibold text-center mb-4">
            Reset Password
          </h1>
          <p className="text-center mb-6 text-gray-700">
            Enter your registered email address
          </p>
          <div className="flex justify-between mb-8">
            <input
              type="email"
              required
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12  text-white py-3 outline-none font-semibold bg-gray-700 px-2 text-[18px] rounded-md"
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="cursor-pointer w-70 py-3 bg-[#ff6767] text-white rounded-full font-semibold text-xl"
            >
              Submit
            </button>
          </div>

          <div className="text-center mt-4">
            <Link
              to={"/login"}
              className="text-gray-800 underline hover:text-fuchsia-800 hover:font-bold"
            >
              {" "}
              Go back
            </Link>
          </div>
        </form>
      )}

      {/* OTP input form */}

      {!isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={onSubmitOtp}
          className="bg-white p-8 rounded-lg shadow-lg w-146 text-sm z-10 h-110 flex flex-col justify-center"
        >
          <h1 className="text-2xl font-semibold text-center mb-4">
            Reset Password OTP
          </h1>
          <p className="text-center mb-6 text-gray-600">
            Enter the 6-digit code sent to your email id
          </p>
          <div className="flex gap-3 justify-center mb-8" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  key={index}
                  required
                  maxLength="1"
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 bg-gray-700 text-white text-center text-xl rounded-md"
                />
              ))}
          </div>
          <div className="flex justify-center">
            <button className="cursor-pointer w-70 py-3 bg-[#ff6767] text-white rounded-full font-semibold text-xl">
              Verify
            </button>
          </div>
        </form>
      )}

      {/* new password form */}
      {isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={onSubmitNewPassword}
          className="bg-white p-8 rounded-lg shadow-lg w-96 text-sm z-10"
        >
          <h1 className="text-gray-800 text-2xl font-  semibold text-center mb-4">
            Reset Password
          </h1>
          <p className="text-center mb-6 text-gray-700">
            Enter your new password
          </p>
          <div className="flex justify-between mb-8">
            <input
              type="passwprd"
              required
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12  text-white py-3 outline-none font-semibold bg-gray-700 px-2 text-[18px] rounded-md"
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="cursor-pointer w-70 py-3 bg-[#ff6767] text-white rounded-full font-semibold text-xl"
            >
              Submit
            </button>
          </div>

          <div className="text-center mt-4">
            <Link
              to={"/login"}
              className="text-gray-800 underline hover:text-fuchsia-800 hover:font-bold"
            >
              {" "}
              Go back
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default PasswordReset;
