import React from 'react';
import { useVerification, VerifcationProvider } from './useVerification';
import { NotificationProvider, useNotification } from './useNotification';
import { useAuth, AuthProvider } from './useAuth';

const AppProvider: React.FC = ({ children }) => (
  <VerifcationProvider>
    <AuthProvider>
      <NotificationProvider>{children}</NotificationProvider>
    </AuthProvider>
  </VerifcationProvider>
);

export { useVerification, AppProvider, useAuth, useNotification };
