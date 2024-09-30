import { createContext, useState } from "react";

export const Context = createContext();

export const Provider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [fitnessData, setFitnessData] = useState([]);

  return (
    <Context.Provider
      value={{
        userId,
        setUserId,
        fitnessData,
        setFitnessData,
        isSignedIn,
        setIsSignedIn,
      }}
    >
      {children}
    </Context.Provider>
  );
};
