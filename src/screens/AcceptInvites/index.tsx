import React, { useCallback, useEffect, useState } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';
import {
  Container,
  Header,
  PageTitle,
  ContactAvatar,
  ContactDeatilsContainer,
  ContactInfoContainer,
  ContactName,
  EnviteTitle,
  ButtonsContainer,
  ButtonsText,
  CancelButton,
  ConfirmButton,
} from './styles';
import { Contacts } from '../../assets';
import api from '../../services/api';

interface RouteProps {
  name: string;
  key: string;
  params: {
    contact_id: string;
  };
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
}

const AcceptInvites: React.FC = () => {
  const { params } = useRoute<RouteProps>();
  const [contact, setContact] = useState<Contact>({} as Contact);
  const [accepted, setAccepted] = useState(false);

  const { navigate, goBack } = useNavigation();

  const handleAcceptInvite = useCallback(async () => {
    try {
      const response = await api.get(`/contacts/${params.contact_id}`);

      if (response.data.id) {
        setAccepted(true);
        return;
      }

      await api.post('/invites/accept', {
        owner_id: params.contact_id,
      });

      setAccepted(true);
    } catch ({ response }) {
      Alert.alert('error', response.data.message);
    }
  }, [params.contact_id]);

  useEffect(() => {
    async function loadPreferences() {
      const response = await api.get(`/users/${params.contact_id}`);

      setContact(response.data);
    }

    loadPreferences();
  }, [params.contact_id]);

  return (
    <>
      <Container>
        <Header>
          <Contacts width="60" height="60" />
          <PageTitle>Detalhe do convite</PageTitle>
        </Header>

        {contact && (
          <ContactDeatilsContainer>
            <ContactAvatar
              source={{
                uri: contact.avatar
                  ? contact.avatar
                  : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
              }}
            />
            <ContactInfoContainer>
              <ContactName>{contact.name}</ContactName>
              {!accepted ? (
                <EnviteTitle>
                  {`${contact.name} deseja fazer parte da sua lista de contato, deseja aceitar?`}
                </EnviteTitle>
              ) : (
                <EnviteTitle>
                  {`${contact.name} agora faz parte dos seus contatos!`}
                </EnviteTitle>
              )}
            </ContactInfoContainer>
          </ContactDeatilsContainer>
        )}

        {!accepted ? (
          <ButtonsContainer>
            <CancelButton onPress={goBack}>
              <ButtonsText>Recusar</ButtonsText>
            </CancelButton>
            <ConfirmButton onPress={handleAcceptInvite}>
              <ButtonsText>Aceitar</ButtonsText>
            </ConfirmButton>
          </ButtonsContainer>
        ) : (
          <ButtonsContainer>
            <ConfirmButton onPress={() => navigate('Contacts')}>
              <ButtonsText>Voltar</ButtonsText>
            </ConfirmButton>
          </ButtonsContainer>
        )}
      </Container>
    </>
  );
};

export default AcceptInvites;
