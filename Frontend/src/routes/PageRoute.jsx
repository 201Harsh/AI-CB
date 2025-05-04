import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Start from "../Pages/Start";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import HomeProtector from "../Pages/HomeProtector";
import AutoRedirect from "../Pages/AutoRedirect";
import Settings from "../Pages/Settings";
import Profile from "../Pages/Profile";
import OTPVerification from "../Pages/OTPVerification";
import Pricing from "../Pages/Pricing";
import Payment from "../Pages/Payment";
import About from "../Pages/About";
import Features from "../Pages/Features";
import AuthPrompt from "../Pages/AuthPrompt";
import Careers from "../Pages/Carrers";
import Contact from "../Pages/Contact";
import HelpPage from "../Pages/HelpPage";

const PageRoute = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AutoRedirect />} />
          <Route path="/start" element={<Start />} />
          <Route
            path="/home"
            element={
              <HomeProtector>
                <Home />
              </HomeProtector>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
          <Route path="/home" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/authprompt" element={<AuthPrompt />} />
          <Route path="/features" element={<Features />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/payment/:planId" element={<Payment />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default PageRoute;
