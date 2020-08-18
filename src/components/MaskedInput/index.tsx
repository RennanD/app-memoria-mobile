import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';

import { useField } from '@unform/core';

import { TextInputMaskProps } from 'react-native-masked-text';

import { Container, Icon, Input } from './styles';

interface InputProps extends TextInputMaskProps {
  name: string;
  icon: string;
  borderColor?: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const MaskedInput: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, borderColor = '#fff', ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(false);

  const { fieldName, registerField, defaultValue = '', error } = useField(name);

  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [inputValue, setInputValue] = useState<string>(defaultValue);
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, [setIsFocused]);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputValueRef.current.value);
  }, [setIsFilled, setIsFocused, inputValueRef]);

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
    <Container borderColor={borderColor} error={!!error} isFocused={isFocused}>
      <Icon
        name={icon}
        size={30}
        color={isFocused || isFilled ? '#65C4B0' : '#ddd'}
      />
      <Input
        ref={inputElementRef}
        value={inputValue}
        onChangeText={value => {
          setInputValue(value);
          inputValueRef.current.value = value;
        }}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(MaskedInput);
