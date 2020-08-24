import React, { useState, useEffect, useCallback } from 'react';
import { FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import {
  Container,
  Header,
  PageTitle,
  ContactCard,
  ContactAvatar,
  ContactName,
  FloatButton,
} from './styles';
import boxShadownEffect from '../../styles/boxShadow';

import ContactsPlaceholder from './ContactsPlaceholder';
import NewContactModal from './NewContactModal';
import EmptyView from '../../components/EmptyView';

import { Contacts as ContactsIcon } from '../../assets';

import api from '../../services/api';

import { User } from '../../hooks/useAuth';

interface Contact {
  id: string;
  user: User;
}

const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoagind] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const { navigate } = useNavigation();

  const handleShowContact = useCallback(
    contact_id => {
      navigate('ContactDetail', { contact_id });
    },
    [navigate],
  );

  const handleToggleModal = useCallback(() => {
    setIsVisible(state => !state);
  }, []);

  useEffect(() => {
    async function loadContacts() {
      setLoagind(state => !state);
      const response = await api.get('/contacts');

      setContacts(response.data);
      setLoagind(state => !state);
    }

    loadContacts();
  }, []);

  if (!contacts.length) {
    return (
      <>
        <Container>
          <Header>
            <ContactsIcon width="60" height="60" />
            <PageTitle>Meus contatos</PageTitle>
          </Header>

          <EmptyView text="Ainda não há contatos adicinados" icon="user" />
        </Container>
        <FloatButton onPress={handleToggleModal} style={boxShadownEffect}>
          <Feather name="plus" color="#fff" size={24} />
        </FloatButton>

        <NewContactModal
          isVisible={isVisible}
          toggleModal={handleToggleModal}
        />
      </>
    );
  }

  return (
    <>
      <Container>
        <Header>
          <ContactsIcon width="60" height="60" />
          <PageTitle>Meus contatos</PageTitle>
        </Header>

        {loading ? (
          <ContactsPlaceholder />
        ) : (
          <FlatList
            data={contacts}
            showsVerticalScrollIndicator={false}
            keyExtractor={contact => contact.id}
            renderItem={({ item: contact }) => (
              <ContactCard onPress={() => handleShowContact(contact.id)}>
                <ContactAvatar source={{ uri: contact.user.avatar }} />
                <ContactName>{contact.user.name}</ContactName>
              </ContactCard>
            )}
          />
        )}
      </Container>
      <FloatButton onPress={handleToggleModal} style={boxShadownEffect}>
        <Feather name="plus" color="#fff" size={24} />
      </FloatButton>

      <NewContactModal isVisible={isVisible} toggleModal={handleToggleModal} />
    </>
  );
};

export default Contacts;
