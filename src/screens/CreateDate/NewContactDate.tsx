import React, { useCallback, useRef, useState } from 'react';
import { Alert } from 'react-native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { Container, FormContainer } from './styles';

import Input from '../../components/TextInput';
import MaskedInput from '../../components/MaskedInput';
import PickerInput from '../../components/PickerInput';
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
      label: 'Namorada',
      value: 'namorada',
    },
  ];

  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (data: Request) => {
    setLoading(true);
    const { date, description, name, phone_number, relationship } = data;

    const formatted_phone = `+55${phone_number.replace(/\s/g, '')}`;

    try {
      const contactResponse = await api.post('/contacts', {
        name,
        phone_number: formatted_phone,
        relationship,
      });

      const { id } = contactResponse.data;

      await api.post('/dates', {
        contact_id: id,
        date,
        description,
      });

      Alert.alert('Sucesso', 'Evento cadastrado com sucesso');
      setLoading(false);
    } catch ({ response }) {
      console.log(response);

      Alert.alert('Erro', response.data.message);
      setLoading(false);
    }
  }, []);

  return (
    <Container>
      <FormContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <MaskedInput
            name="phone_number"
            icon="cellphone-iphone"
            borderColor="#ddd"
            placeholder="Telefone"
            type="custom"
            options={{
              mask: '99 9 9999 9999',
            }}
          />
          <PickerInput
            borderColor="#ddd"
            name="relationship"
            placeholder="Selecinone um relacionamento"
            items={pickerItems}
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

export default NewContactDate;
