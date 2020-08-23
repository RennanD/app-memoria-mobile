import React, { useCallback } from 'react';
import { View } from 'react-native';

import RNPickerSelect from 'react-native-picker-select';

import { Container } from './styles';

interface HeaderProps {
  onChangeMonth(value: string): void;
  currentMonth: string;
}

const ListDateHeader: React.FC<HeaderProps> = ({
  onChangeMonth,
  currentMonth,
}) => {
  const handleChangeMonth = useCallback(
    value => {
      onChangeMonth(value);
    },
    [onChangeMonth],
  );

  const months = [
    {
      label: 'Janeiro',
      value: '1',
    },
    {
      label: 'Fevereiro',
      value: '2',
    },
    {
      label: 'Março',
      value: '3',
    },
    {
      label: 'Abril',
      value: '4',
    },
    {
      label: 'Maio',
      value: '5',
    },
    {
      label: 'Junho',
      value: '6',
    },
    {
      label: 'Julho',
      value: '7',
    },
    {
      label: 'Agosto',
      value: '8',
    },
    {
      label: 'Setembro',
      value: '9',
    },
    {
      label: 'Outubro',
      value: '10',
    },
    {
      label: 'Novembro',
      value: '11',
    },
    {
      label: 'Dezembro',
      value: '12',
    },
  ];

  return (
    <Container>
      <View style={{ width: '100%' }}>
        <RNPickerSelect
          value={currentMonth}
          placeholder={{ label: 'Selecione um mês' }}
          onValueChange={itemValue => handleChangeMonth(itemValue)}
          items={months}
        />
      </View>
    </Container>
  );
};

export default ListDateHeader;
