import React, { createContext, useState } from "react";

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setuser] = useState("");
  return (
    <userDataContext.Provider value={{ user, setuser}}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
