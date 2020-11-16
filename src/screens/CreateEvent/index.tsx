import React, { useCallback, useState } from 'react';
import { Feather } from '@expo/vector-icons';

import { Calendar, DateObject } from 'react-native-calendars';

import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  OptionsTitle,
  OptionsContainer,
  OptionButton,
  OptionText,
} from './styles';
import boxShadownEffect from '../../styles/boxShadow';

import Button from '../../components/Button';

const typeDateoptions = [
  {
    key: '1',
    option: 'WithContact',
    icon: 'users',
    description: 'Para um usuário da lista',
  },
  {
    key: '2',
    option: 'PersonalDate',
    icon: 'user',
    description: 'Data pessoal',
  },
  {
    key: '3',
    option: 'NewContact',
    icon: 'user-x',
    description: 'Data sem um contato da lista',
  },
];

interface SelectedDateType {
  key: string;
  route: string;
}

const CreateEvent: React.FC = () => {
  const [current, setCurrent] = useState<string>('');
  const [selectedDateType, setSelectedDateType] = useState<SelectedDateType>(
    {} as SelectedDateType,
  );

  const { navigate } = useNavigation();

  const handleSelectDate = useCallback((selectDate: DateObject) => {
    setCurrent(selectDate.dateString);
  }, []);

  const handleSelectDateType = useCallback((dateType: SelectedDateType) => {
    setSelectedDateType(dateType);
  }, []);

  const handleNextStep = useCallback(() => {
    if (!selectedDateType.key || !current) {
      Alert.alert('Erro', 'Selecione o dia e o tipo de data para continuar');
    } else {
      navigate(selectedDateType.route, {
        data: { date: current },
      });
    }
  }, [current, navigate, selectedDateType]);

  return (
    <Container>
      <Calendar
        monthFormat="MMMM"
        hideArrows={false}
        current={current}
        markedDates={{
          [current]: { selected: true, selectedColor: '#65c4b0' },
        }}
        onDayPress={newDate => handleSelectDate(newDate)}
      />
      <OptionsTitle>Selecione o tipo da data</OptionsTitle>

      <OptionsContainer>
        {typeDateoptions.map(option => (
          <OptionButton
            selected={option.key === selectedDateType.key}
            key={option.key}
            style={boxShadownEffect}
            onPress={() => {
              handleSelectDateType({ key: option.key, route: option.option });
            }}
          >
            <Feather name={option.icon} color="#25a182" size={30} />
            <OptionText>{option.description}</OptionText>
          </OptionButton>
        ))}
      </OptionsContainer>

      <Button
        disabled={!selectedDateType.key}
        onPress={handleNextStep}
        style={{
          marginHorizontal: 10,
          marginTop: 30,
        }}
        loading={false}
      >
        Próximo
      </Button>
    </Container>
  );
};

export default CreateEvent;
