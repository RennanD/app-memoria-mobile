import React, { useCallback, useEffect, useRef, useState } from 'react';

import RBSheet from 'react-native-raw-bottom-sheet';

import { useField } from '@unform/core';
import { FlatList } from 'react-native';
import api from '../../services/api';

import {
  Container,
  InputContainer,
  Icon,
  Title,
  SelectedContactContainer,
  SelectedContactName,
  PlaceholderText,
  ContactAvatar,
  ContactCard,
  ContactName,
} from './styles';

import { User } from '../../hooks/useAuth';

interface BottomSheetContactsSelectProps {
  name: string;
}

interface InputValueReference {
  value: string;
}

interface Contact {
  id: string;
  user: User;
}

const BottomSheetContactsSelect: React.FC<BottomSheetContactsSelectProps> = ({
  name,
}) => {
  const { fieldName, registerField, defaultValue = '' } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
  const refRBSheet = useRef<any>();

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedConatct, setSelectedContact] = useState('');

  useEffect(() => {
    async function loadContacts() {
      const response = await api.get('/contacts');

      setContacts(response.data);
    }

    loadContacts();
  }, []);

  const handleChangeContact = useCallback(
    (contact_id: string, contact_name: string) => {
      inputValueRef.current.value = contact_id;
      setSelectedContact(contact_name);
      refRBSheet.current.close();
    },
    [],
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
    });
  });

  return (
    <Container>
      <InputContainer
        onPress={() => refRBSheet.current.open()}
        borderColor={selectedConatct ? '#25a182' : '#ddd'}
      >
        <Icon />
        <SelectedContactContainer>
          {selectedConatct ? (
            <SelectedContactName>{selectedConatct}</SelectedContactName>
          ) : (
            <PlaceholderText>Selecione um contato da lista</PlaceholderText>
          )}
        </SelectedContactContainer>
      </InputContainer>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown
        closeOnPressMask={false}
        height={550}
      >
        <Title>Selecione um contato</Title>
        <FlatList
          data={contacts}
          keyExtractor={contact => contact.id}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          renderItem={({ item: contact }) => (
            <ContactCard
              onPress={() => {
                handleChangeContact(contact.id, contact.user.name);
              }}
            >
              <ContactAvatar source={{ uri: contact.user.avatar }} />
              <ContactName>{contact.user.name}</ContactName>
            </ContactCard>
          )}
        />
      </RBSheet>
    </Container>
  );
};

export default BottomSheetContactsSelect;
