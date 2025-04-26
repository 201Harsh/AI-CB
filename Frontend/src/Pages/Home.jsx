import React, { useEffect, useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  UserIcon,
  Cog6ToothIcon,
  ChatBubbleLeftIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";
import SplashCursor from "../Animations/SplashCursor";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [splashEnabled, setSplashEnabled] = useState(false);
  const [IsTite, setIsTite] = useState(false);

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

  const navigation = [
    { name: "Home", href: "#", icon: HomeIcon },
    { name: "Profile", href: "#", icon: UserIcon },
    { name: "New Chat", href: "#", icon: ChatBubbleLeftIcon },
    { name: "Settings", href: "#", icon: Cog6ToothIcon },
  ];

  return (
    <div className="h-screen w-screen bg-gray-900 relative overflow-hidden">
      {/* Button to open sidebar */}
      {IsTite ? (
        <div
          className="flex items-center gap-4 mt-4 relative w-52"
          onClick={() => setIsOpen(true)}
        >
          <div className="flex">
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
          className={`fixed md:relative top-0 left-0 h-full bg-gray-800 text-white transition-transform duration-300
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

              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center p-3 text-gray-300 hover:bg-gray-700 hover:text-yellow-400 rounded-lg transition-colors"
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </a>
              ))}
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
                <button className="cursor-pointer w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:opacity-90">
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
        <div className="bg-gray-900 h-full w-full md:w-[80%]"></div>
      </div>
    </div>
  );
};

export default Home;
