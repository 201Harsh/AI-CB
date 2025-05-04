import React, { createContext, useState } from "react";

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const [User, setUser] = useState("");
  const [rescount, setrescount] = useState(0)
  return (
    <userDataContext.Provider value={{ User, setUser , rescount, setrescount}}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
