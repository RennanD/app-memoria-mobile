import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Alert } from 'react-native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { Container, FormContainer } from './styles';

import Input from '../../components/TextInput';
import PickerInput from '../../components/PickerInput';
import DatePickerInput from '../../components/DatePickerInput/index.android';
import Button from '../../components/Button';

import api from '../../services/api';

interface Request {
  contact_id: string;
  date: Date;
  description: string;
}

interface ContactItem {
  label: string;
  value: string;
}

interface Contatc {
  user: {
    name: string;
  };
  id: string;
}

const WithContactDate: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState<ContactItem[]>([] as ContactItem[]);

  useEffect(() => {
    async function loadContacts() {
      const response = await api.get('/contacts');

      const data = response.data.map((contact: Contatc) => ({
        label: contact.user.name,
        value: contact.id,
      }));

      setContacts(data);
    }

    loadContacts();
  }, []);

  const handleSubmit = useCallback(async (data: Request) => {
    setLoading(true);
    const { date, description, contact_id } = data;

    try {
      await api.post('/dates', {
        contact_id,
        date,
        description,
      });

      Alert.alert('Sucesso', 'Evento cadastrado com sucesso');
      setLoading(false);
    } catch ({ response }) {
      Alert.alert('Erro', 'Não foi possível criar o evento.');
      console.log(response.data);
      setLoading(false);
    }
  }, []);

  return (
    <Container>
      <FormContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <PickerInput
            borderColor="#ddd"
            name="contact_id"
            placeholder="Selecinone contato"
            items={contacts}
            icon="account-heart-outline"
          />

          <DatePickerInput
            name="date"
            borderColor="#ddd"
            placeholder="Data do evento"
          />

          <Input
            name="description"
            icon="card-text-outline"
            placeholder="Descrição"
            borderColor="#ddd"
          />

          <Button
            loading={loading}
            onPress={() => formRef.current?.submitForm()}
          >
            Adicionar
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default WithContactDate;
