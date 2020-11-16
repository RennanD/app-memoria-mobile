import React, { useCallback, useEffect, useRef, useState } from 'react';

import RBSheet from 'react-native-raw-bottom-sheet';

import { useField } from '@unform/core';
import { FlatList } from 'react-native';
import api from '../../services/api';

import {
  Container,
  InputContainer,
  Icon,
  Title,
  SelectedContactContainer,
  SelectedContactName,
  PlaceholderText,
} from './styles';

import { User } from '../../hooks/useAuth';

interface BottomSheetContactsSelectProps {
  name: string;
}

interface InputValueReference {
  value: string;
}

interface Items {
  value: string;
  label: string;
}

const BottomSheetContactsSelect: React.FC<BottomSheetContactsSelectProps> = ({
  name,
}) => {
  const { fieldName, registerField, defaultValue = '' } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
  const refRBSheet = useRef<any>();

  const handleChangeSelectedItem = useCallback((value: string) => {
    inputValueRef.current.value = value;
    refRBSheet.current.close();
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
    });
  });

  return (
    <Container>
      <InputContainer
        onPress={() => refRBSheet.current.open()}
        borderColor={selectedConatct ? '#25a182' : '#ddd'}
      >
        <Icon />
        <SelectedContactContainer>
          {selectedConatct ? (
            <SelectedContactName>{selectedConatct}</SelectedContactName>
          ) : (
            <PlaceholderText>Selecione um contato da lista</PlaceholderText>
          )}
        </SelectedContactContainer>
      </InputContainer>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown
        closeOnPressMask={false}
        height={550}
      >
        <Title>Selecione um contato</Title>
        <FlatList
          data={contacts}
          keyExtractor={contact => contact.id}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          renderItem={({ item: contact }) => <View />}
        />
      </RBSheet>
    </Container>
  );
};

export default BottomSheetContactsSelect;
