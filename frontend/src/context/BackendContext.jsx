import React, { createContext, useContext } from "react";

// Create the BackendContext
const BackendContext = createContext();

// Create a provider component
export const BackendProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;;

  return (
    <BackendContext.Provider value={{ backendUrl }}>
      {children}
    </BackendContext.Provider>
  );
};

// Export BackendContext to use it directly if needed
export { BackendContext };

// You can use the context in your components now
export const useBackend = () => {
  return useContext(BackendContext);
};
