import React from 'react';

import { useVerification, useAuth } from '../hooks';

import AuthRoutes from './auth.routes';
import VerificationRoutes from './verification.routes';
import AppRoutes from './app.routes';

const Routes: React.FC = () => {
  const { verified } = useVerification();
  const { account } = useAuth();

  if (account) {
    return <AppRoutes />;
  }

  return verified ? <AuthRoutes /> : <VerificationRoutes />;
};

export default Routes;
