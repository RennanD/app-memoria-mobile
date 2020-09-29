import React, { useCallback } from 'react';
import { Linking } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  Container,
  Header,
  PageTitle,
  EnviteButton,
  EnviteButtonText,
  Content,
} from './styles';

const InviteFriends: React.FC = () => {
  const handleShareApp = useCallback(() => {
    // eslint-disable-next-line prettier/prettier
    const message = 'Olá, estou o app Mémoria, venha aproveitar você também essa novidade, clique aqui para fazer o download \n https://drive.google.com/drive/folders/1700p2GAdCWUo6mWVUYcNYYUkxyiHcWLZ?usp=sharing';

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

      <EnviteButton onPress={handleShareApp}>
        <EnviteButtonText>Compartilhar via whatsapp</EnviteButtonText>
      </EnviteButton>

      <Content />
    </Container>
  );
};

export default InviteFriends;
