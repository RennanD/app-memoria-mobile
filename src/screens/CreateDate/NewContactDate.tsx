import React, { useCallback, useRef, useState } from 'react';
import { Alert } from 'react-native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { Container, FormContainer } from './styles';

import Input from '../../components/TextInput';

import DatePickerInput from '../../components/DatePickerInput/index.android';
import Button from '../../components/Button';

import api from '../../services/api';
import PickerInput from '../../components/PickerInput';

interface Request {
  name: string;
  phone_number: string;
  relationship: string;
  date: Date;
  description: string;
}

const NewContactDate: React.FC = () => {
  const pickerItems = [
    {
      label: 'Pai',
      value: 'pai',
    },
    {
      label: 'Mãe',
      value: 'mãe',
    },
    {
      label: 'Avó',
      value: 'avó',
    },
    {
      label: 'Avô',
      value: 'avô',
    },
    {
      label: 'Tio',
      value: 'tio',
    },
    {
      label: 'Tia',
      value: 'tia',
    },
    {
      label: 'Irmão',
      value: 'irmão',
    },
    {
      label: 'Irmã',
      value: 'irmã',
    },
    {
      label: 'Primo',
      value: 'primo',
    },
    {
      label: 'Prima',
      value: 'prima',
    },
    {
      label: 'Amigo',
      value: 'amigo',
    },
    {
      label: 'Amiga',
      value: 'amiga',
    },
    {
      label: 'Namorada',
      value: 'namorada',
    },
  ];

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
          <Input
            name="friend_name"
            icon="account"
            placeholder="Nome..."
            borderColor="#ddd"
          />

          <PickerInput
            icon="account-heart-outline"
            placeholder="Relacionamento"
            borderColor="#ddd"
            name="relationship"
            items={pickerItems}
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

export default NewContactDate;
