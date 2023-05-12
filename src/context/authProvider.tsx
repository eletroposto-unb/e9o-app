import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {storeUser, removeUser} from '../context/asyncStorage';

export const AuthContext = createContext(null);

export const AuthContextProvider = ({children}: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(Object || null);

  const login = async (email: string, password: string) => {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(async data => {
        await storeUser(data.user);
        setUser(data.user);
        setIsAuthenticated(true);
      });
  };

  const logout = async () => {
    await auth().signOut();
    await removeUser();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{isAuthenticated, user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
