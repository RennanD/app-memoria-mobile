import React, { useRef, useCallback } from 'react';
import { TextInput, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import { useVerification, useAuth } from '../../hooks';

import {
  Container,
  Input,
  LinkTextContainer,
  HelpText,
  LinkButtonText,
  LinkButton,
} from './styles';

import Button from '../../components/Button';
import MaskedInput from '../../components/MaskedInput';
import PickerInput from '../../components/PickerInput';
import DatePickerInput from '../../components/DatePickerInput/index.android';
import api from '../../services/api';

interface SingUpData {
  address: string;
  birthday: Date;
  cpf: string;
  email: string;
  gender: string;
  name: string;
  password: string;
  phone_number: string;
  zipcode: string;
}

const Register: React.FC = () => {
  const { navigate } = useNavigation();
  const { phone_number } = useVerification();
  const { signIn } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const passwordRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(
    async (data: SingUpData) => {
      try {
        await api.post('/users', {
          phone: data.phone_number,
          ...data,
        });

        Alert.alert('Sucesso', 'Usuário cadastrado com sucesso');

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch ({ response }) {
        Alert.alert('Erro', response.data.message);
      }
    },
    [signIn],
  );

  const handleNavigate = useCallback(() => {
    navigate('Login');
  }, [navigate]);

  return (
    <Container>
      <Form
        ref={formRef}
        initialData={{ phone_number }}
        onSubmit={handleSubmit}
      >
        <Input
          autoCorrect={false}
          autoCapitalize="words"
          icon="account"
          placeholder="Nome completo"
          name="name"
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current?.focus()}
        />

        <Input
          ref={emailRef}
          autoCorrect={false}
          autoCapitalize="none"
          icon="email"
          placeholder="E-mail"
          keyboardType="email-address"
          name="email"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />

        <Input
          ref={passwordRef}
          icon="lock"
          placeholder="Senha"
          secureTextEntry
          name="password"
          returnKeyType="next"
        />

        <MaskedInput
          icon="cellphone-iphone"
          placeholder="Telefone"
          editable={false}
          name="phone_number"
          returnKeyType="next"
          type="custom"
          options={{
            mask: '+99 99 9 9999 9999',
          }}
        />

        <DatePickerInput name="birthday" placeholder="Data de nascimento" />

        <PickerInput
          name="gender"
          icon="gender-male-female"
          placeholder="Selecione um gênero"
          items={[
            { label: 'Masculino', value: 'masculino' },
            { label: 'Feminino', value: 'feminino' },
            { label: 'Outro', value: 'outro' },
          ]}
        />

        <MaskedInput
          icon="mailbox-outline"
          placeholder="CEP"
          name="zipcode"
          returnKeyType="send"
          type="zip-code"
          onSubmitEditing={() => formRef.current?.submitForm()}
        />

        <Button loading={false} onPress={() => formRef.current?.submitForm()}>
          Cadastrar
        </Button>
      </Form>

      <LinkTextContainer>
        <HelpText>Já tem uma conta?</HelpText>
        <LinkButton onPress={handleNavigate}>
          <LinkButtonText>Fazer login.</LinkButtonText>
        </LinkButton>
      </LinkTextContainer>
    </Container>
  );
};

export default Register;
