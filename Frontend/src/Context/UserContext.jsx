import React, { createContext, useState } from "react";

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setuser] = useState("");
  const [otp, setotp] = useState('')
  return (
    <userDataContext.Provider value={{ user, setuser , otp, setotp }}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
