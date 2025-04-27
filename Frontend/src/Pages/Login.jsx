import React, { useContext, useState } from "react";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { userDataContext } from "../Context/UserContext";
import axios from "../Config/Axios";
import { toast, Bounce , ToastContainer } from "react-toastify";


const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const Navigate = useNavigate();

  const { user, setuser } = useContext(userDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usersData = { email, password };

    const response = await axios.post("/users/login", usersData);

    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      const Users = response.data.user;
      localStorage.setItem("name", Users.name);
      setuser(Users);
      toast.success("🧑 User Login Successfully", {
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
    }

    setemail("");
    setpassword("");
  };

  return (
    <div className="min-h-screen bg-[url('/bg10.jpg')] bg-cover bg-center flex items-center justify-center p-4">
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
      <div className="bg-[#16161665] p-8 rounded-lg shadow-xl w-full max-w-md backdrop-blur-xl">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
          Login to Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              Email
            </label>
            <div className="relative">
              <EnvelopeIcon className="h-5 w-5 text-yellow-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                value={email}
                required
                onChange={(e) => setemail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-transparent border-b-2 border-white text-white outline-none"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <LockClosedIcon className="h-5 w-5 text-yellow-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                required
                onChange={(e) => setpassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2 bg-transparent border-b-2 border-white text-white outline-none"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-400 hover:text-yellow-500 transition-colors"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          New Here? Create an account{" "}
          <Link
            to="/register"
            className="text-yellow-400 hover:text-yellow-500 underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
