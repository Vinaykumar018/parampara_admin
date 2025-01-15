import React, { createContext, useState } from 'react';

// Create the Context
export const AppContext = createContext();

// Create the Provider component
const AppProvider = ({ children }) => {
  const [contextPanditData,setContextPanditData] = useState([]);
  const [contextPoojaData,setContextPoojaData] = useState([]);
  const [contextUserData,setContextUserData] = useState([]);
 
  return (
    <AppContext.Provider
      value={{
        contextPanditData,setContextPanditData,contextPoojaData,setContextPoojaData,contextUserData,setContextUserData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
