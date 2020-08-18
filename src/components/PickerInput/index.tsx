import React, { useState, useRef, useEffect } from 'react';

import RNPickerSelect from 'react-native-picker-select';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useField } from '@unform/core';

import { View } from 'react-native';
import { Container } from './styles';

interface PickerItemProps {
  label: string;
  value: string;
}

interface PickerProps {
  name: string;
  icon: string;
  placeholder: string;
  borderColor?: string;
  items: PickerItemProps[];
}

interface InputValueReference {
  value: string;
}

const PickerInput: React.FC<PickerProps> = ({
  name,
  icon,
  items,
  placeholder,
  borderColor = '#fff',
}) => {
  const { fieldName, registerField, defaultValue = '' } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [selected, setSelected] = useState<React.ReactText>('');

  const inputElementRef = useRef<any>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
    });
  });

  return (
    <>
      <Container borderColor={borderColor}>
        <MaterialCommunityIcons name={icon} size={30} color="#65C4B0" />

        <View style={{ flex: 1 }}>
          <RNPickerSelect
            ref={inputElementRef}
            placeholder={{ label: placeholder }}
            onValueChange={itemValue => {
              inputValueRef.current.value = String(itemValue);
              setSelected(itemValue);
            }}
            items={items}
          />
        </View>
      </Container>
    </>
  );
};

export default PickerInput;
