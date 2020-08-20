import React from 'react';

import { AppLoading } from 'expo';

import { useAuth } from '../hooks';

import AuthRoutes from './auth.routes';
// import VerificationRoutes from './verification.routes';
import AppRoutes from './app.routes';

const Routes: React.FC = () => {
  // const { verified, verifyLoading } = useVerification();
  const { account, authLoading } = useAuth();

  if (authLoading) {
    return <AppLoading />;
  }

  return account ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
