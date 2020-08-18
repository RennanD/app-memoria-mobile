import React, { useState, useEffect, useCallback } from 'react';

import { useRoute } from '@react-navigation/native';

import { format, parseISO } from 'date-fns';
import {
  Container,
  Header,
  PageTitle,
  ContactDeatilsContainer,
  ContactAvatar,
  ContactInfoContainer,
  ContactName,
  ContactDescription,
  PreferencesAccordionList,
  SectionTitle,
} from './styles';

import PreferencesAccordion from '../../components/PreferencesAccordion';

import { Contacts } from '../../assets';

import api from '../../services/api';

interface Contact {
  id: string;
  name: string;
  email: string;
  birthday: Date;
  formattedBirthday: string;
  avatar: string;
  relationship: string;
}

interface PreferenceProps {
  category: string;
  subcategories: string[];
}

interface RouteProps {
  name: string;
  key: string;
  params: {
    contact_id: string;
  };
}

const ContactDetail: React.FC = () => {
  const [contact, setContact] = useState<Contact>({} as Contact);
  const [preferences, setPreferences] = useState<PreferenceProps[]>(
    [] as PreferenceProps[],
  );
  const [activeItem, setActiveItem] = useState('');

  const { params } = useRoute<RouteProps>();

  useEffect(() => {
    async function loadContatc() {
      const response = await api.get(`/contacts/${params.contact_id}`);

      const data = {
        ...response.data,
        formattedBirthday: format(
          parseISO(response.data.birthday),
          "dd'/'MM'/'yyyy",
        ),
      };

      setContact(data);
    }

    loadContatc();
  }, [params.contact_id]);

  const handleToggleAccordion = useCallback(
    (name: string) => {
      if (activeItem === name) {
        setActiveItem('');
        return;
      }
      setActiveItem(name);
    },
    [activeItem],
  );
  useEffect(() => {
    async function loadPreferences() {
      const response = await api.get(`/preferences/person/${contact.id}`);

      setPreferences(response.data);
    }

    loadPreferences();
  }, [contact.id]);

  if (!contact) {
    return <Container />;
  }

  return (
    <>
      <Container>
        <Header>
          <Contacts width="60" height="60" />
          <PageTitle>Detalhe do contato</PageTitle>
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
            <ContactDescription>
              {`Relacionamento:  ${contact.relationship}`}
            </ContactDescription>
            <ContactDescription>
              {`Data de anviversário:  ${contact.formattedBirthday}`}
            </ContactDescription>
          </ContactInfoContainer>
        </ContactDeatilsContainer>

        <SectionTitle>Lista de preferências</SectionTitle>

        <PreferencesAccordionList>
          {preferences.map(preference => (
            <PreferencesAccordion
              key={preference.category}
              items={preference.subcategories}
              onPress={() => handleToggleAccordion(preference.category)}
              opened={activeItem === preference.category}
              title={preference.category}
            />
          ))}
        </PreferencesAccordionList>
      </Container>
    </>
  );
};

export default ContactDetail;
