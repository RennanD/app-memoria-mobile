import React, { useCallback, useRef } from 'react';
import Modal from 'react-native-modal';
import { Alert } from 'react-native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import {
  Container,
  Title,
  ConfirmButton,
  CancelButton,
  ButtonText,
  Content,
} from './styles';

import PickerInput from '../../../components/PickerInput';
import MaskedInput from '../../../components/MaskedInput';

import api from '../../../services/api';

interface NewContactModalProps {
  toggleModal(): void;
  isVisible: boolean;
}

interface ContactProps {
  phone_number: string;
  relationship: string;
}

const NewContactModal: React.FC<NewContactModalProps> = ({
  isVisible,
  toggleModal,
}) => {
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

  const handleSubmit = useCallback(async (data: ContactProps) => {
    const formatted_phone = `+55${data.phone_number.replace(/\s/g, '')}`;

    try {
      await api.post('/contacts', {
        relationship: data.relationship,
        phone_number: formatted_phone,
      });
    } catch ({ response }) {
      Alert.alert('Error', response.data.error);
    }
  }, []);

  return (
    <Modal
      useNativeDriver
      style={{ margin: 0, justifyContent: 'flex-end' }}
      isVisible={isVisible}
    >
      <Container>
        <Title>Adicionar contato</Title>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <MaskedInput
              name="phone_number"
              icon="cellphone-iphone"
              placeholder="Telefone"
              borderColor="#ddd"
              type="custom"
              options={{
                mask: '99 9 9999 9999',
              }}
            />

            <PickerInput
              icon="account-heart-outline"
              placeholder="Relacionamento"
              borderColor="#ddd"
              name="relationship"
              items={pickerItems}
            />

            <ConfirmButton onPress={() => formRef.current?.submitForm()}>
              <ButtonText>Confirmar</ButtonText>
            </ConfirmButton>
            <CancelButton onPress={toggleModal}>
              <ButtonText>Cancelar</ButtonText>
            </CancelButton>
          </Form>
        </Content>
      </Container>
    </Modal>
  );
};

export default NewContactModal;
