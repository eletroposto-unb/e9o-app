import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {storeUser, removeUser} from '../context/asyncStorage';
import {getUserByUid} from '../services/user/user.service';

export const AuthContext = createContext(null);

export const AuthContextProvider = ({children}: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState<User>();

  const login = async (email: string, password: string) => {
    const firebaseUser = await auth()
      .signInWithEmailAndPassword(email, password)
      .then(async data => {
        setIsAuthenticated(true);
        return data;
      });
    const userDb = await getUserByUid(firebaseUser.user.uid);
    if (userDb && userDb.value && firebaseUser && firebaseUser.user) {
      const userStorage: User = {
        name: userDb.value.name,
        surname: userDb.value.surname,
        email: userDb.value.email,
        cpf: userDb.value.cpf,
        is_admin: userDb.value.is_admin,
        telefone: userDb.value.telefone,
        status: userDb.value.status,
        firebase_uid: firebaseUser.user.uid,
        wallet: userDb.value.wallet,
      };
      setUser(userStorage);
      console.info('userStorage', userStorage);
      await storeUser(userStorage);
    }
  };

  const register = async (email: string, password: string) => {
    console.info('register data', email, password);
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
    await removeUser();
    setIsAuthenticated(false);
    setUser(null);
    await auth().signOut();
  };

  const deleteAccount = async (firebase_uid: string) => {
    let user = await auth().currentUser;
    user
      .delete()
      .then(() => {
        return true;
      })
      .catch(error => {
        return false;
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        setUser,
        logout,
        register,
        deleteAccount,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
