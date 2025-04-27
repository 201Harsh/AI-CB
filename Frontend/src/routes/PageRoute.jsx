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
          <Route path="/home" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default PageRoute;
