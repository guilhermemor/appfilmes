import  { createContext, useState } from 'react';

export const FalseContext = createContext();

export const FalseContextProvider = ({ children }) => {
  const [popfalse, setPopFalse] = useState(true);

  return (
    <FalseContext.Provider value={{ popfalse, setPopFalse}}>
      {children}
    </FalseContext.Provider>
  );
};

