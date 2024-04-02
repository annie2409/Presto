import React, { useContext, useEffect, useState } from 'react';
import { UserData } from '../data/userData';
import { useUserStore } from '../apis/store';

const UserDataContext = React.createContext(new UserData());

export const useUserDataContext = () => useContext(UserDataContext);

export const UserDataProvider = ({ children }) => {
  const { data, isLoading, error } = useUserStore();
  const [userData, setUserData] = useState(new UserData());

  useEffect(() => {
    if (data && !isLoading) {
      setUserData(UserData.fromData(data.store.store));
    }
  }, [data]);

  const updateUserData = (newValue) => {
    console.log('setting user data ', newValue);
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
