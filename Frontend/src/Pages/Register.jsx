import React, { useContext, useState } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import axios from "../Config/Axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { userDataContext } from "../Context/UserContext";
import { motion } from "framer-motion";

const Register = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const Navigate = useNavigate();

  const { user, setuser } = useContext(userDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Newuser = { name, email, password };

    const response = await axios.post("/users/register", Newuser);

    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem('otp', response.data.otp);
      const UserData = response.data.user;
      localStorage.setItem("name", UserData.name);
      localStorage.setItem("email", UserData.email);
      setuser(UserData);
      Navigate("/otp-verification");
    }

    setname("");
    setemail("");
    setpassword("");
  };

  return (
    <div className="min-h-screen bg-[url('/bg24.jpg')] bg-cover bg-center flex items-center justify-center p-4">
      <ToastContainer
        position="top-right"
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
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-gray-900/50 to-gray-900/100 p-8 rounded-2xl shadow-2xl w-full max-w-md backdrop-blur-2xl md:backdrop-blur-xl border border-yellow-400/30"
      >
        <h2 className="text-4xl font-bold text-yellow-400 mb-8 text-center font-[Poppins]">
          Welcome to EmoAI 
          <br />
          Join Us
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name Input */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-yellow-400/80 text-sm font-semibold mb-3">
              Full Name
            </label>
            <div className="relative group">
              <UserIcon className="h-5 w-5 text-yellow-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-yellow-500 transition-colors" />
              <input
                type="text"
                name="name"
                autoFocus
                required
                value={name}
                onChange={(e) => setname(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/40 text-yellow-100 rounded-lg border-2 border-yellow-400/30 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all placeholder:text-yellow-400/50"
                placeholder="Harsh"
              />
            </div>
          </motion.div>

          {/* Email Input */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-yellow-400/80 text-sm font-semibold mb-3">
              Email Address
            </label>
            <div className="relative group">
              <EnvelopeIcon className="h-5 w-5 text-yellow-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-yellow-500 transition-colors" />
              <input
                type="email"
                name="email"
                value={email}
                required
                onChange={(e) => setemail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/40 text-yellow-100 rounded-lg border-2 border-yellow-400/30 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all placeholder:text-yellow-400/50"
                placeholder="endgamingai2@gmail.com"
              />
            </div>
          </motion.div>

          {/* Password Input */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-yellow-400/80 text-sm font-semibold mb-3">
              Password
            </label>
            <div className="relative group">
              <LockClosedIcon className="h-5 w-5 text-yellow-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-yellow-500 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                required
                onChange={(e) => setpassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-gray-800/40 text-yellow-100 rounded-lg border-2 border-yellow-400/30 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 outline-none transition-all placeholder:text-yellow-400/50"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-400 hover:text-yellow-500 transition-colors"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-6 w-6" />
                ) : (
                  <EyeIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <button
              type="submit"
              className="w-full cursor-pointer bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-lg transition-all 
              hover:from-yellow-600 hover:to-yellow-700 shadow-lg hover:shadow-yellow-500/20"
            >
              Create Account
            </button>
          </motion.div>
        </form>

        <p className="text-center text-yellow-400/80 mt-8">
          Already Have an account?{" "}
          <Link
            to="/login"
            className="text-yellow-400 font-semibold hover:text-yellow-500 underline underline-offset-4 transition-colors"
          >
            Login Now
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
