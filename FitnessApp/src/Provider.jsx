import { createContext, useState } from "react";
export const Context = createContext();
export const Provider = ({ children }) => {
  const [userid, setUserid] = useState("");
  const [IsSignedIn, setIsSignedIn] = useState(false);
  const [FitnessData, setFitnessData] = useState([]);
  const [userId, setUserId] = useState("");
  return (
    <Context.Provider
      value={{
        userid,
        setUserid,
        FitnessData,
        setFitnessData,
        IsSignedIn,
        setIsSignedIn,
        userId,
        setUserId,
      }}
    >
      {children}
    </Context.Provider>
  );
};
