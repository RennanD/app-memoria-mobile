/* eslint-disable @typescript-eslint/ban-types */
import React, {
  createContext,
  useCallback,
  useState,
  useEffect,
  useContext,
} from 'react';

import { Alert } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import { useVerification } from '.';

import api from '../services/api';

interface SingInCredencials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  birthday: string;
  avatar: string;
}

interface Account {
  user: User;
}

interface AuthState {
  token: string;
  account: Account;
}

interface AuthContextData {
  account: Account;
  signIn(credencials: SingInCredencials): Promise<void>;
  signOut(): Promise<void>;
  updateAvatar(user: User): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);

  const { cancelVerify } = useVerification();

  useEffect(() => {
    async function loadAccount(): Promise<void> {
      const token = await AsyncStorage.getItem('@memoria:token');
      const account = await AsyncStorage.getItem('@memoria:account');

      if (token && account) {
        api.defaults.headers.authorization = `Bearer ${token}`;
        setData({ token, account: JSON.parse(account) });
      }
    }

    loadAccount();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    try {
      const response = await api.post('/sessions', {
        email,
        password,
      });

      const { account, token } = response.data;

      await AsyncStorage.setItem('@memoria:token', token);
      await AsyncStorage.setItem('@memoria:account', JSON.stringify(account));

      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({ token, account });
    } catch (err) {
      Alert.alert('Erro', 'Dados de usuário inválidos!');
    }
  }, []);

  const signOut = useCallback(async () => {
    const { account } = data;

    await api.delete(`/sessions/${account.user.id}`);

    await AsyncStorage.removeItem('@memoria:token');
    await AsyncStorage.removeItem('@memoria:account');

    cancelVerify();

    setData({} as AuthState);
  }, [cancelVerify, data]);

  const updateAvatar = useCallback(
    async (user: User) => {
      const account = {
        user,
      };

      await AsyncStorage.setItem('@memoria:account', JSON.stringify(account));
      setData({ account, token: data.token });
    },
    [data.token],
  );

  return (
    <AuthContext.Provider
      value={{ account: data.account, signIn, signOut, updateAvatar }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}
