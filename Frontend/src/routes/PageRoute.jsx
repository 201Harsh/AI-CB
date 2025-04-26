import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Start from "../Pages/Start";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const PageRoute = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default PageRoute;
