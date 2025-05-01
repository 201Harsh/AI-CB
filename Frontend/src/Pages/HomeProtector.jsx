import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../Context/UserContext";
import axios from "../Config/Axios";

const HomeProtector = ({ children }) => {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);
  const { user, setuser } = useContext(userDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      if (!token) {
        navigate("/register");
        return;
      }

      try {
        const res = await axios.get("/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          setuser(res.data);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("name");
          navigate("/register");
        }
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        navigate("/home");
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, [token, navigate, setuser]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-900">
        <h1 className="text-5xl font-bold text-yellow-400">Loading....</h1>
      </div>
    );
  }

  return <>{children}</>;
};

export default HomeProtector;
