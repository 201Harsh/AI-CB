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

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true); // Desktop
      } else {
        setIsOpen(false); // Mobile
      }
    };

    handleResize(); // Call once on mount

    window.addEventListener("resize", handleResize); // Optional: update on window resize
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const username = localStorage.getItem("name");

  const navigation = [
    { name: "Dashboard", href: "#", icon: HomeIcon },
    { name: "Profile", href: "#", icon: UserIcon },
    { name: "Chat History", href: "#", icon: ChatBubbleLeftIcon },
    { name: "Settings", href: "#", icon: Cog6ToothIcon },
  ];

  return (
    <div className="h-screen w-screen bg-gray-900 relative overflow-hidden">
      {/* Button to open sidebar */}
      <Bars3Icon
        className="h-8 w-8 text-white absolute top-4 left-4 cursor-pointer z-20"
        onClick={() => setIsOpen(true)}
      />

      <div className="flex h-full w-full relative justify-between">
        {/* Sidebar */}
        <div
          className={`fixed md:relative top-0 left-0 h-full bg-gray-800 text-white transition-transform duration-300s
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:w-72 w-80`}
        >
          {/* Close button inside sidebar */}
          <XMarkIcon
            className="h-8 w-8 text-yellow-400 absolute right-4 top-4 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar content */}
          <div className="flex flex-col gap-4 p-4">
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
        </div>

        {/* Main content area */}
        <div className="bg-gray-900 h-full w-full md:w-[80%]">
          <h1 className="text-3xl font-bold text-yellow-400 p-4">Welcome {username}</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
