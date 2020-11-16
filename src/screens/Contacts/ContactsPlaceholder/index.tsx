import React from 'react';

import { Container, AvatarPlaceholder, NamePlaceholder } from './styles';

const ContactsPlaceholder: React.FC = () => (
  <>
    <Container>
      <AvatarPlaceholder autoRun />
      <NamePlaceholder autoRun />
    </Container>
    <Container>
      <AvatarPlaceholder autoRun />
      <NamePlaceholder autoRun />
    </Container>
    <Container>
      <AvatarPlaceholder autoRun />
      <NamePlaceholder autoRun />
    </Container>
  </>
);

export default ContactsPlaceholder;
