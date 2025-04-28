import React, { useContext, useRef, useState } from "react";
import { FaShieldAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OTPVerification = () => {
  const inputRefs = useRef([]);
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);

  const email = String(localStorage.getItem("email"));
  const otp = String(localStorage.getItem("otp"));

  const Navigate = useNavigate();
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const updatedOtp = [...otpValues];
      updatedOtp[index] = value;
      setOtpValues(updatedOtp);

      // Move to next input if a digit is entered
      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, 4);
    if (/^[0-9]+$/.test(paste)) {
      const pasteArray = paste.split("");
      const updatedOtp = [...otpValues];
      pasteArray.forEach((digit, i) => {
        if (i < 4) {
          updatedOtp[i] = digit;
          if (inputRefs.current[i]) {
            inputRefs.current[i].value = digit;
          }
        }
      });
      setOtpValues(updatedOtp);
      if (pasteArray.length < 4) {
        inputRefs.current[pasteArray.length].focus();
      } else {
        inputRefs.current[3].blur();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullOtp = otpValues.join("");
    if (fullOtp === otp) {
      toast.success("🧑 User Registered Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setTimeout(() => {
        Navigate("/home");
      }, 2000);
      localStorage.removeItem("otp");
    } else {
      toast.error("🧑 Invalid OTP", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setOtpValues(["", "", "", ""]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-yellow-900/50 flex items-center justify-center p-4">
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="w-full max-w-md bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl border border-yellow-400/20">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-3 rounded-xl mb-4">
            <FaShieldAlt className="text-3xl sm:text-4xl text-gray-900" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-yellow-400 text-center mb-2">
            Verify OTP
          </h1>
          <p className="text-gray-300 text-center text-sm sm:text-base">
            Enter the 4-digit code sent to{" "}
            <span className="font-semibold text-yellow-400">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div
            className="flex justify-center gap-2 sm:gap-4"
            onPaste={handlePaste}
          >
            {[...Array(4)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-700 rounded-xl text-yellow-400 text-2xl text-center 
                         focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder:text-yellow-400/50"
                placeholder="•"
                autoComplete="one-time-code"
                autoFocus={index === 0}
                ref={(el) => (inputRefs.current[index] = el)}
                value={otpValues[index]}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                required
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 py-2 sm:py-3 rounded-lg 
                     font-semibold text-base sm:text-lg transition-all duration-200"
          >
            Verify Code
          </button>
        </form>

        <div className="text-center mt-4 sm:mt-6">
          <p className="text-gray-400 text-sm sm:text-base">
            Didn't receive code?{" "}
            <button className="text-yellow-400 hover:text-yellow-500 transition-colors">
              Resend Code
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
