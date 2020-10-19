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
  ContactAvatar,
  ContatcContainer,
  ContactName,
} from './styles';

import { useAuth } from '../../hooks';
import Button from '../../components/Button';

const InviteFriends: React.FC = () => {
  const { account } = useAuth();

  const handleShareApp = useCallback(() => {
    // eslint-disable-next-line prettier/prettier
    const message = 'Olá, estou o app Mémoria, venha aproveitar você também essa novidade, clique no link abaixo para fazer o download \n https://drive.google.com/drive/folders/1700p2GAdCWUo6mWVUYcNYYUkxyiHcWLZ?usp=sharing';

    Linking.openURL(`whatsapp://send?text=${message}`);
  }, []);

  const handleShareeInive = useCallback(() => {
    // eslint-disable-next-line prettier/prettier
    const url = `https://appmemoria.herokuapp.com/accept/${account.user.id}`;

    const message = `Olá, gostaria de fazer parte dos seus contatos no Memória e adicionar você nos meus contatos. \n Clique para abrir o convite: ${url}`;

    Linking.openURL(`whatsapp://send?text=${message}`);
  }, [account.user.id]);

  return (
    <Container>
      <Header>
        <MaterialCommunityIcons
          name="account-group"
          color="#65c4b0"
          size={100}
        />
        <PageTitle>Envie o link para seus amigos baixarem o Memória</PageTitle>
      </Header>

      <EnviteButton onPress={handleShareApp}>
        <EnviteButtonText>Link de download</EnviteButtonText>
      </EnviteButton>

      <Content>
        <ContatcContainer>
          <ContactAvatar
            source={{
              uri: account.user.avatar,
            }}
          />
          <ContactName>
            Gerar um link compartilhavel para o meu perfil do Memória
          </ContactName>
        </ContatcContainer>

        <Button loading={false} onPress={handleShareeInive}>
          Enviar um convite via Whatsapp
        </Button>
      </Content>
    </Container>
  );
};

export default InviteFriends;
