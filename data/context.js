import { useState, createContext } from 'react';

export const AppContext = createContext({
  template: '',
});

export const AppContextProvider = ({ children, domElement }) => {
  const [currentIssue, setcurrentIssue] = useState({});

  const context = {
    currentIssue,
    setcurrentIssue,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppContext;
