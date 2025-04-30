import React, { createContext, useState } from "react";

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setuser] = useState("");
  const [rescount, setrescount] = useState(0)
  return (
    <userDataContext.Provider value={{ user, setuser , rescount, setrescount}}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
