import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';

import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, Input, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  borderColor?: string;
  valueDefautlt?: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const TextInput: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, borderColor = '#fff', valueDefautlt, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(false);

  const { fieldName, registerField, defaultValue = '', error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, [setIsFocused]);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputValueRef.current.value);
  }, [setIsFilled, setIsFocused, inputValueRef]);

  if (valueDefautlt) {
    inputValueRef.current.value = valueDefautlt;
  }

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(reference: any, value: string) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container error={!!error} isFocused={isFocused} borderColor={borderColor}>
      <Icon
        name={icon}
        size={30}
        color={isFocused || isFilled ? '#65C4B0' : '#ddd'}
      />
      <Input
        ref={inputElementRef}
        defaultValue={defaultValue}
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(TextInput);
