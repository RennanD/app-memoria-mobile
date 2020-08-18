import React from 'react';
import { useVerification, VerifcationProvider } from './useVerification';
import { NotificationProvider, useNotification } from './useNotification';
import { useAuth, AuthProvider } from './useAuth';

const AppProvider: React.FC = ({ children }) => (
  <NotificationProvider>
    <VerifcationProvider>
      <AuthProvider>{children}</AuthProvider>
    </VerifcationProvider>
  </NotificationProvider>
);

export { useVerification, AppProvider, useAuth, useNotification };
