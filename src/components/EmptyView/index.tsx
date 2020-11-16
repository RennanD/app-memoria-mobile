import React from 'react';

import { Feather } from '@expo/vector-icons';

import { Container, EmptyViewText } from './styles';

interface EmptyProps {
  text: string;
  icon: string;
}

const EmptyView: React.FC<EmptyProps> = ({ text, icon }) => (
  <Container>
    <Feather name={icon} size={32} color="#ddd" />
    <EmptyViewText>{text}</EmptyViewText>
  </Container>
);

export default EmptyView;
