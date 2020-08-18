import React, { useCallback } from 'react';
import { Linking } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  Container,
  Header,
  PageTitle,
  EnviteButton,
  EnviteButtonText,
} from './styles';

const EnviteFriends: React.FC = () => {
  const handleEnvite = useCallback(() => {
    // eslint-disable-next-line prettier/prettier
    const message = 'Olá, estou o app Mémoria, venha aproveitar você também essa novidade';

    Linking.openURL(`whatsapp://send?text=${message}`);
  }, []);

  return (
    <Container>
      <Header>
        <MaterialCommunityIcons
          name="account-group"
          color="#65c4b0"
          size={100}
        />
        <PageTitle>Condive pessoas</PageTitle>
      </Header>

      <EnviteButton onPress={handleEnvite}>
        <EnviteButtonText>Convidar via whatsapp</EnviteButtonText>
      </EnviteButton>
    </Container>
  );
};

export default EnviteFriends;
