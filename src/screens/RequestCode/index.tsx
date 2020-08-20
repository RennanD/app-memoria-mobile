import React, { useState, useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import {
  Container,
  LogoImage,
  ContainerInput,
  Icon,
  Input,
  Prefix,
} from './styles';

import Button from '../../components/Button';

import { logo } from '../../assets';

import { useVerification } from '../../hooks';

const RequestCode: React.FC = () => {
  const { requestCode } = useVerification();
  const { navigate } = useNavigation();

  const [phone_number, setPhoneNumber] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(async () => {
    setLoading(true);

    const formatted_phone = `+55${phone_number.replace(/\s/g, '')}`;

    try {
      const registered = await requestCode(formatted_phone);

      if (registered) {
        navigate('Login');
      } else {
        navigate('Register');
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [navigate, phone_number, requestCode]);
  return (
    <Container>
      <LogoImage source={logo} />

      <ContainerInput>
        <Icon name="cellphone-iphone" size={30} color="#65C4B0" />
        <Prefix>+ 55</Prefix>
        <Input
          placeholder="(99) 9 9999-9999"
          keyboardType="phone-pad"
          placeholderTextColor="#ccc"
          value={phone_number}
          onChangeText={setPhoneNumber}
          type="custom"
          options={{
            mask: '99 9 9999 9999',
          }}
        />
      </ContainerInput>
      <Button loading={loading} onPress={handleSubmit}>
        Solicitar código
      </Button>
    </Container>
  );
};

export default RequestCode;
