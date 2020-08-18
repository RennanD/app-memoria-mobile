import React from 'react';

import { TouchableOpacityProps, ActivityIndicator } from 'react-native';

import { Container, ButtonText } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  loading: boolean;
}

const Button: React.FC<ButtonProps> = ({ loading, children, ...rest }) => (
  <Container {...rest}>
    {loading ? (
      <ActivityIndicator size={30} color="#fff" />
    ) : (
      <ButtonText>{children}</ButtonText>
    )}
  </Container>
);

export default Button;
