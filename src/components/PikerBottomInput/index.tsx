import React, { useCallback, useEffect, useRef, useState } from 'react';

import RBSheet from 'react-native-raw-bottom-sheet';

import { useField } from '@unform/core';
import { FlatList } from 'react-native';

import {
  Container,
  InputContainer,
  Icon,
  Title,
  SelectedItemContainer,
  SelectedItemLabel,
  PlaceholderText,
  ItemCard,
  ItemLabel,
} from './styles';

interface InputValueReference {
  value: string;
}

interface Item {
  value: string;
  label: string;
}

interface BottomSheetPikerProps {
  name: string;
  items: Item[];
  icon?: string;
}

const BottomSheetPiker: React.FC<BottomSheetPikerProps> = ({
  name,
  items,
  icon,
}) => {
  const { fieldName, registerField, defaultValue = '' } = useField(name);

  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const refRBSheet = useRef<any>();

  const [selectedItem, setSelectedItem] = useState<Item>({} as Item);

  const handleChangeSelectedItem = useCallback((item: Item) => {
    inputValueRef.current.value = item.value;
    setSelectedItem(item);
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
        borderColor={selectedItem.value ? '#25a182' : '#ddd'}
      >
        <Icon
          name={icon || 'format-list-bulleted'}
          size={30}
          color={selectedItem.value ? '#25a182' : '#ddd'}
        />
        <SelectedItemContainer>
          {selectedItem.label ? (
            <SelectedItemLabel>{selectedItem.label}</SelectedItemLabel>
          ) : (
            <PlaceholderText>Selecione um contato da lista</PlaceholderText>
          )}
        </SelectedItemContainer>
      </InputContainer>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown
        closeOnPressMask={false}
        height={550}
      >
        <Title>Selecione uma opção</Title>
        <FlatList
          data={items}
          keyExtractor={item => item.value}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          renderItem={({ item }) => (
            <ItemCard
              onPress={() => {
                handleChangeSelectedItem(item);
              }}
            >
              <Icon
                name={icon || 'format-list-bulleted'}
                size={36}
                color="#25a182"
              />
              <ItemLabel>{item.label}</ItemLabel>
            </ItemCard>
          )}
        />
      </RBSheet>
    </Container>
  );
};

export default BottomSheetPiker;
