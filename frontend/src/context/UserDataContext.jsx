import React, { useContext, useEffect, useState } from 'react';
import { UserData } from '../utils/userData';
import { useUserStore } from '../apis/store';

const UserDataContext = React.createContext(new UserData());

export const useUserDataContext = () => useContext(UserDataContext);

export const UserDataProvider = ({ children }) => {
  const { data, isLoading, error } = useUserStore();
  const [userData, setUserData] = useState(new UserData());

  useEffect(() => {
    if (!isLoading) {
      setUserData(UserData.fromData(data.store.store));
    }
  }, [isLoading]);

  const updateUserData = (newValue) => {
    setUserData(newValue);
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
