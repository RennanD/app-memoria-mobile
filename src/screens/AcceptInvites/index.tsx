import React, { useEffect, useState } from 'react';

import { useRoute } from '@react-navigation/native';
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
            <EnviteTitle>
              {`${contact.name} deseja fazer parte da sua lista de contato, deseja aceitar?`}
            </EnviteTitle>
          </ContactInfoContainer>
        </ContactDeatilsContainer>

        <ButtonsContainer>
          <CancelButton>
            <ButtonsText>Recusar</ButtonsText>
          </CancelButton>
          <ConfirmButton>
            <ButtonsText>Aceitar</ButtonsText>
          </ConfirmButton>
        </ButtonsContainer>
      </Container>
    </>
  );
};

export default AcceptInvites;
