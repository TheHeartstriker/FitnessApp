import { createContext, useState } from "react";

export const Context = createContext();

export const Provider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <Context.Provider
      value={{
        isSignedIn,
        setIsSignedIn,
      }}
    >
      {children}
    </Context.Provider>
  );
};
