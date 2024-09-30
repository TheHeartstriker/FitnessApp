import { createContext, useState } from "react";
export const Context = createContext();
export const Provider = ({ children }) => {
  const [userid, setUserid] = useState("");
  const [IsSignedIn, setIsSignedIn] = useState(false);
  const [FitnessData, setFitnessData] = useState([]);
  return (
    <Context.Provider
      value={{
        userid,
        setUserid,
        FitnessData,
        setFitnessData,
        IsSignedIn,
        setIsSignedIn,
      }}
    >
      {children}
    </Context.Provider>
  );
};
