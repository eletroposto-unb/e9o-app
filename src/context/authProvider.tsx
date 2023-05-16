import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {storeUser, removeUser} from '../context/asyncStorage';
import {getUserByUid} from '../services/user/user.service';

export const AuthContext = createContext(null);

export const AuthContextProvider = ({children}: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(Object || null);

  const login = async (email: string, password: string) => {
    const firebaseUser = await auth()
      .signInWithEmailAndPassword(email, password)
      .then(async data => {
        await storeUser(data.user);
        setUser(data.user);
        setIsAuthenticated(true);
        return data;
      });
    const userDb = await getUserByUid(firebaseUser.user.uid);
    // Buscar dados do usuário no banco por meio do uid
    // Criar state para salvar usuário nesse contexto 
    // Funçãou logout deve remover dados do asyncStorage e do state criado para salvar os dados do user
  };

  const register = async (email: string, password: string) => {
    console.log('register data', email, password);
    const firebaseUser = await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async data => {
        return data;
      })
      .catch(async error => {
        console.log(error);
        return error;
      });
    return firebaseUser;
  };

  const logout = async () => {
    await auth().signOut();
    await removeUser();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{isAuthenticated, user, login, logout, register}}>
      {children}
    </AuthContext.Provider>
  );
};
