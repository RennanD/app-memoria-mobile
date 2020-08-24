import React, { useCallback, useRef, useState } from 'react';
import { Alert } from 'react-native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { Container, FormContainer } from './styles';

import Input from '../../components/TextInput';

import DatePickerInput from '../../components/DatePickerInput/index.android';
import Button from '../../components/Button';

import api from '../../services/api';

interface Request {
  name: string;
  phone_number: string;
  relationship: string;
  date: Date;
  description: string;
}

const NewContactDate: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (data: Request) => {
    setLoading(true);
    const { date, description } = data;

    try {
      await api.post('/user-generic-dates', {
        date,
        description,
      });

      Alert.alert('Sucesso', 'Evento cadastrado com sucesso');
      setLoading(false);
    } catch ({ response }) {
      Alert.alert('Erro', response.data.message);
      setLoading(false);
    }
  }, []);

  return (
    <Container>
      <FormContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
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

export default NewContactDate;
