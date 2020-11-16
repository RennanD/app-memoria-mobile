import React from 'react';
import { View, Text } from 'react-native';

import { Form } from '@unform/mobile';

import BottomSheetContactsSelect from '../../../components/BottomSheetContactsSelect';

// import { Container } from './styles';

const WithContact: React.FC = () => (
  <View style={{ flex: 1, padding: 20, paddingTop: 50 }}>
    <Text>Contato da lista</Text>
    <Form
      onSubmit={() => {
        console.log('oi');
      }}
    >
      <BottomSheetContactsSelect name="contact" />
    </Form>
  </View>
);

export default WithContact;
