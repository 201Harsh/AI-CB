import React, { useEffect, useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  UserIcon,
  Cog6ToothIcon,
  ChatBubbleLeftIcon,
  CpuChipIcon,
  StopCircleIcon,
} from "@heroicons/react/24/outline";

import SplashCursor from "../Animations/SplashCursor";
import { Link, useNavigate } from "react-router-dom";
import axios from "../Config/Axios";
import { toast, Bounce, ToastContainer } from "react-toastify";
import PopUp from "../Components/PopUp";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [splashEnabled, setSplashEnabled] = useState(false);
  const [IsTite, setIsTite] = useState(false);
  const [showPopup, setShowPopup] = useState(true); // Added popup state
  const [prompt, setprompt] = useState("");

  const Navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true); // Desktop
        setIsTite(false);
      } else {
        setIsOpen(false); // Mobile
        setIsTite(true);
      }
    };

    handleResize(); // Call once on mount

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const username = localStorage.getItem("name");

  const handleprompt = (e) => {
    e.preventDefault();
    console.log(prompt);
    setprompt("");
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("/users/logout", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 200) {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      toast.success("🧑 User Logout Successfully", {
        position: "bottom-left",
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
        Navigate("/login");
      }, 2000);
    }
  };

  // Initialize popup only once
  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hasSeenWelcome");
    if (!hasSeenPopup) {
      setShowPopup(true);
      localStorage.setItem("hasSeenWelcome", "true");
    }
  }, []);

  return (
    <>
      <PopUp
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        title={`Hello, ${username}!`}
        message="Impressed with the work so Do Follow Us on Social Media"
      />
      <div className="h-screen w-screen bg-gray-900 relative overflow-hidden">
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
        {/* Button to open sidebar */}
        {IsTite ? (
          <div
            className="flex items-center gap-4 mt-5 relative w-52"
            onClick={() => setIsOpen(true)}
          >
            <div className="flex ml-4">
              <CpuChipIcon className="h-8 w-8 text-yellow-400" />
              <span className="ml-2 text-xl font-bold text-yellow-400">
                AI ChatBot
              </span>
            </div>
            <Bars3Icon className="h-8 w-8 text-white cursor-pointer md:hidden" />
          </div>
        ) : (
          <Bars3Icon
            className="h-8 w-8 text-white absolute top-0 right-4 cursor-pointer z-20 md:hidden"
            onClick={() => setIsOpen(true)}
          />
        )}

        <div className="flex h-full w-full relative justify-between">
          {/* Sidebar */}
          <div
            className={`fixed md:relative z-40 top-0 left-0 h-full bg-gray-800 text-white transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:w-72 w-80`}
          >
            {/* Close button inside sidebar */}
            <XMarkIcon
              className="h-8 w-8 text-yellow-400 absolute right-4 top-4 cursor-pointer md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar content */}
            <div className="flex flex-col justify-between h-full p-4">
              <div>
                <div className="flex items-center mb-14">
                  <CpuChipIcon className="h-8 w-8 text-yellow-400" />
                  <span className="ml-2 text-xl font-bold text-yellow-400">
                    AI ChatBot
                  </span>
                </div>
                <div className="flex flex-col gap-4 p-4">
                  <Link
                    to="/home"
                    className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md"
                  >
                    <HomeIcon className="w-6 h-6 text-yellow-400" />
                    <span>Home</span>
                  </Link>

                  <Link
                    to="/profile"
                    className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md"
                  >
                    <UserIcon className="w-6 h-6 text-yellow-400" />
                    <span>Profile</span>
                  </Link>

                  <Link
                    to="#"
                    className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md"
                  >
                    <ChatBubbleLeftIcon className="w-6 h-6 text-yellow-400" />
                    <span>New Chat</span>
                  </Link>

                  <Link
                    to="/settings"
                    className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md"
                  >
                    <Cog6ToothIcon className="w-6 h-6 text-yellow-400" />
                    <span>Settings</span>
                  </Link>
                </div>
              </div>

              {/* Toggle Splash Cursor Button at bottom */}
              <div className="p-4">
                <div className="flex items-center gap-2 p-2">
                  <span className="text-sm font-semibold text-gray-300">
                    Enable Magic
                  </span>
                  <button
                    onClick={() => setSplashEnabled((prev) => !prev)}
                    className={`w-14 h-8 flex items-center rounded-full p-1 duration-300 ease-in-out 
      ${splashEnabled ? "bg-yellow-400" : "bg-gray-600"}`}
                  >
                    <div
                      className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out
        ${splashEnabled ? "translate-x-6" : "translate-x-0"}`}
                    />
                  </button>
                </div>
                <p className="text-xs text-gray-400 ml-2 font-extralight mb-2">
                  Note: Only for Desktop users
                </p>
                <div className="p-4 border-t border-white/10">
                  <button
                    onClick={handleLogout}
                    className="cursor-pointer active:scale-95 w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 duration-100 transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                      />
                    </svg>
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main content area */}
          {splashEnabled && <SplashCursor />}
          <div className="bg-gray-900 h-full w-full md:w-[80%]">
            <div className="flex flex-col items-center justify-center h-full w-full font-[poppins] p-4 relative z-10">
              {/* Main greeting */}
              <h1 className="font-bold text-4xl md:text-6xl text-yellow-400 flex items-center gap-2">
                Hello{" "}
                <span className="bg-gradient-to-r from-orange-300 to-red-200 bg-clip-text text-transparent">
                  {username}
                </span>
                <span className="wave">👋</span>
              </h1>

              {/* Welcome message */}
              <h1 className="font-bold text-3xl md:text-5xl bg-gradient-to-r from-yellow-300 to-[#d6f813] bg-clip-text text-transparent mt-4">
                Welcome to AI ChatBot
              </h1>

              {/* Small note */}
              <h4 className="font-bold text-lg md:text-xl text-gray-400 mt-4">
                ~ AI Powered 💪 By EndGaming{" "}
                <span className="ml-2 rocket-float">🚀</span>
              </h4>
            </div>
            <div className="relative w-full">
              <div className="absolute bottom-8 mb:bottom-0 left-0 w-full h-42 z-10 p-4 md:p-14">
                <form
                  onSubmit={handleprompt}
                  className="flex items-center justify-between w-full font-semibold text-white bg-gray-700 md:mt-0 mt-10 p-4 md:p-7 rounded-2xl"
                >
                  <textarea
                    value={prompt}
                    autoFocus
                    onChange={(e) => setprompt(e.target.value)}
                    className="w-[80%] bg-transparent outline-none resize-none"
                    placeholder="Type your message here..."
                    rows={1}
                    onInput={(e) => {
                      e.target.style.height = "auto";
                      e.target.style.height = e.target.scrollHeight + "px";
                    }}
                    maxLength={10000} // optional: limit max total length
                    required
                  />
                  <button type="submit">
                    <PaperAirplaneIcon className="h-7 w-7 cursor-pointer" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
