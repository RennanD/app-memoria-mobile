import React, { useRef, useCallback, useState } from 'react';
import { TextInput } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import { useAuth } from '../../hooks';

import {
  Container,
  LogoImage,
  Input,
  LinkTextContainer,
  HelpText,
  LinkButton,
  LinkButtonText,
} from './styles';

import Button from '../../components/Button';

import { logo } from '../../assets';

interface SingInCredencials {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { navigate } = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const passwordRef = useRef<TextInput>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    (data: SingInCredencials) => {
      const { email, password } = data;

      setLoading(true);

      signIn({
        email,
        password,
      });

      setLoading(false);
    },
    [signIn],
  );

  const handleNavigate = useCallback(() => {
    navigate('Register');
  }, [navigate]);

  return (
    <Container>
      <LogoImage source={logo} />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          icon="account"
          placeholder="E-mail"
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
          returnKeyType="send"
          onSubmitEditing={() => formRef.current?.submitForm()}
        />

        <Button loading={loading} onPress={() => formRef.current?.submitForm()}>
          Login
        </Button>
      </Form>

      <LinkTextContainer>
        <HelpText>Não tem uma conta?</HelpText>
        <LinkButton onPress={handleNavigate}>
          <LinkButtonText>Inscreva-se.</LinkButtonText>
        </LinkButton>
      </LinkTextContainer>
    </Container>
  );
};

export default Login;
