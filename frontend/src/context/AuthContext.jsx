import React, { useContext, useState } from 'react';
import { LOGGED_IN_USER } from '../utils/constants.js';
import { LoggedInUser } from '../data/currentUser.js';

const AuthContext = React.createContext(null);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const currentLoggedInUser = JSON.parse(
    sessionStorage.getItem(LOGGED_IN_USER),
  );
  console.log(currentLoggedInUser);
  const [user, setUser] = useState(
    currentLoggedInUser !== null
      ? new LoggedInUser(currentLoggedInUser.email, currentLoggedInUser.token)
      : null,
  );

  const updateUser = (newValue) => {
    console.log('Update user to be ', newValue);
    sessionStorage.setItem(LOGGED_IN_USER, JSON.stringify(newValue));
    setUser(newValue);
  };

  return (
    <AuthContext.Provider value={{ user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
