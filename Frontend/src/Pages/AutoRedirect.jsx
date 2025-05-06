import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmoAIPreloader from "./EmoAIPreloader";

const AutoRedirect = () => {
  const navigate = useNavigate();
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const token = localStorage.getItem("token");
      setShowPreloader(false);
      if (token) {
        navigate("/home");
      } else {
        navigate("/start");
      }
    }, 6000); // Optional delay to show the preloader

    return () => clearTimeout(timer);
  }, [navigate]);

  return showPreloader ? <EmoAIPreloader /> : null;
};

export default AutoRedirect;
