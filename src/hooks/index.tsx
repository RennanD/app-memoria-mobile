import React from 'react';
import { useVerification, VerifcationProvider } from './useVerification';
// import { NotificationProvider, useNotification } from './useNotification';
import { useAuth, AuthProvider } from './useAuth';

const AppProvider: React.FC = ({ children }) => (
  <VerifcationProvider>
    <AuthProvider>{children}</AuthProvider>
  </VerifcationProvider>
);

export { useVerification, AppProvider, useAuth };
