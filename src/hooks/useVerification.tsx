import React, { createContext, useCallback, useState, useContext } from 'react';
import { Alert } from 'react-native';

// import AsyncStorage from '@react-native-community/async-storage';

// import { useAuth } from '.';

import api from '../services/api';

interface VerificationContextData {
  phone_number: string;
  registered: boolean;
  // verified: string | undefined;
  // verifyLoading: boolean;
  requestCode(phone_number: string): Promise<boolean>;
  // verifyCode(phone_number: string, code: string): Promise<void>;
  // cancelVerify(): Promise<void>;
}

const VerificationContext = createContext<VerificationContextData>(
  {} as VerificationContextData,
);

export const VerifcationProvider: React.FC = ({ children }) => {
  // const { account } = useAuth();

  const [phone, setPhone] = useState<string>('');
  // const [verified, setVerified] = useState<string>();
  const [registered, setRegistered] = useState(false);
  // const [verifyLoading, setVerifyloading] = useState(false);

  // useEffect(() => {
  //   async function loadPhone(): Promise<void> {
  //     setVerifyloading(true);
  //     const verified_phone = await AsyncStorage.getItem('@memoria:verified');
  //     if (verified_phone) {
  //       setVerified(verified_phone);
  //     }
  //     setVerifyloading(false);
  //   }

  //   loadPhone();
  // }, []);

  // useEffect(() => {
  //   async function verifyCodeEffect() {
  //     const localVerify = await AsyncStorage.getItem('@memoria:verified');
  //     const storagedPhone = await AsyncStorage.getItem('@memoria:phone');

  //     if (storagedPhone) {
  //       setPhone(storagedPhone);
  //     }

  //     if (localVerify) {
  //       setVerified(localVerify);
  //     }
  //   }

  //   verifyCodeEffect();
  // }, [account]);

  const requestCode = useCallback(async phone_number => {
    try {
      const response = await api.post('/account', {
        phone_number,
      });
      setRegistered(response.data);
      setPhone(phone_number);

      Alert.alert('Sucesso', 'Você está pronto(a) para começar');

      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  }, []);

  // const verifyCode = useCallback(async (phone_number, code) => {
  //   try {
  //     const response = await api.get('/account', {
  //       params: {
  //         phone_number,
  //         verification_code: code,
  //       },
  //     });

  //     setVerified('true');

  //     AsyncStorage.setItem('@memoria:verified', 'true');
  //     AsyncStorage.setItem('@memoria:phone', phone_number);

  //     Alert.alert('Sucesso', response.data.content);
  //   } catch ({ response }) {
  //     throw new Error(response.data.message);
  //   }
  // }, []);

  // const cancelVerify = useCallback(async () => {
  //   setVerified('');
  //   await AsyncStorage.removeItem('@memoria:verified');
  // }, []);

  return (
    <VerificationContext.Provider
      value={{
        phone_number: phone,
        requestCode,
        registered,
      }}
    >
      {children}
    </VerificationContext.Provider>
  );
};
export function useVerification(): VerificationContextData {
  const context = useContext(VerificationContext);

  if (!context) {
    throw new Error(
      'useVerification must be used within a VerifcationProvider',
    );
  }

  return context;
}
