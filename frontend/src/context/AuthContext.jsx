import React, { useContext, useState } from 'react';
import { LOGGED_IN_USER } from '../utils/constants.js';
import { LoggedInUser } from '../data/LoggedInUser.js';

const currentLoggedInUser = JSON.parse(sessionStorage.getItem(LOGGED_IN_USER));

const AuthContext = React.createContext(
  currentLoggedInUser !== null
    ? new LoggedInUser(currentLoggedInUser.email, currentLoggedInUser.token)
    : null,
);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const currentLoggedInUser = JSON.parse(
    sessionStorage.getItem(LOGGED_IN_USER),
  );
  const [user, setUser] = useState(
    currentLoggedInUser !== null
      ? new LoggedInUser(currentLoggedInUser.email, currentLoggedInUser.token)
      : null,
  );

  const updateUser = (newValue) => {
    sessionStorage.setItem(LOGGED_IN_USER, JSON.stringify(newValue));
    setUser(newValue);
  };

  return (
    <AuthContext.Provider value={{ user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
