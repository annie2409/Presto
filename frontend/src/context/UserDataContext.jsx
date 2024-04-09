import React, { useContext, useEffect, useState } from 'react';
import { UserData } from '../data/userData';
import { useUserStorePolling } from '../apis/store';

export const UserDataContext = React.createContext(new UserData());

export const useUserDataContext = () => useContext(UserDataContext);

export const UserDataProvider = ({ children }) => {
  const { data, isLoading, error } = useUserStorePolling();
  const [userData, setUserData] = useState(new UserData());

  useEffect(() => {
    if (data && !isLoading) {
      setUserData(UserData.fromData(data.store.store));
    }
  }, [data]);

  const updateUserData = (newValue) => {
    setUserData(newValue);
    console.log('set new user data', newValue);
  };

  return (
    <UserDataContext.Provider
      value={{
        userData,
        isLoading,
        error,
        updateUserData,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
