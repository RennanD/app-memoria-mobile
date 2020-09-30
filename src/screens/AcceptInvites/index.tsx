import React from 'react';
import { Text } from 'react-native';

import { useRoute } from '@react-navigation/native';

// import { Container } from './styles';

interface RouteProps {
  name: string;
  key: string;
  params: {
    contact_id: string;
  };
}

const AcceptInvites: React.FC = () => {
  const { params } = useRoute<RouteProps>();

  return <Text>{params.contact_id}</Text>;
};

export default AcceptInvites;
