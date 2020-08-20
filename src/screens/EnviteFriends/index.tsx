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
    const message = 'Olá, estou o app Mémoria, venha aproveitar você também essa novidade, clique aqui para fazer o download \n https://exp-shell-app-assets.s3.us-west-1.amazonaws.com/android/%40rennand/app-memoria-6947e1fbb57f41f2b5de29cc08b7c3c4-signed.apk';

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
