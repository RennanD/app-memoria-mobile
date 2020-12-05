import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Feather } from '@expo/vector-icons';

import { Calendar, DateObject } from 'react-native-calendars';

import RBSheet from 'react-native-raw-bottom-sheet';

import { Alert, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { parseISO } from 'date-fns';

import {
  Container,
  OptionsTitle,
  OptionsContainer,
  OptionButton,
  OptionText,
  SeugestionCard,
  SugestionName,
} from './styles';
import boxShadownEffect from '../../styles/boxShadow';

import Button from '../../components/Button';
import api from '../../services/api';

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

interface Sugestion {
  _id: string;
  title: string;
}

const CreateEvent: React.FC = () => {
  const [current, setCurrent] = useState('');
  const [selectedSugestion, setSelectedSugestion] = useState('');
  const [sugestionDate, setSugestionDate] = useState<Sugestion[]>([]);
  const [selectedDateType, setSelectedDateType] = useState<SelectedDateType>(
    {} as SelectedDateType,
  );

  const { navigate } = useNavigation();

  const refRBSheet = useRef<any>();

  const handleSelectDate = useCallback((selectDate: DateObject) => {
    setCurrent(selectDate.dateString);
  }, []);

  const handleSelectDateType = useCallback((dateType: SelectedDateType) => {
    setSelectedDateType(dateType);
  }, []);

  useEffect(() => {
    async function loadSugestions() {
      const response = await api.get('/dates/sugestions/description');
      setSugestionDate(response.data);
    }
    loadSugestions();
  }, []);

  const handleNextStep = useCallback(() => {
    if (!selectedDateType.key || !current) {
      Alert.alert('Erro', 'Selecione o dia e o tipo de data para continuar');
    } else {
      navigate(selectedDateType.route, {
        date: parseISO(current),
        sugestion: selectedSugestion,
      });
    }
  }, [current, navigate, selectedDateType, selectedSugestion]);

  const handleSelectSugestion = useCallback(
    (sugestion_title: string) => {
      setSelectedSugestion(sugestion_title);
      refRBSheet.current.close();
      handleNextStep();
    },
    [handleNextStep],
  );

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
        onPress={() => refRBSheet.current.open()}
        style={{
          marginHorizontal: 10,
          marginTop: 30,
        }}
        loading={false}
      >
        Próximo
      </Button>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown
        closeOnPressMask={false}
        height={550}
      >
        <OptionsTitle>Que data está cadastrando?</OptionsTitle>
        <SeugestionCard onPress={() => handleSelectSugestion('')}>
          <SugestionName style={{ color: '#2193f6' }}>Criar nova</SugestionName>
        </SeugestionCard>
        <FlatList
          data={sugestionDate}
          keyExtractor={sugestion => sugestion._id}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          renderItem={({ item: sugestion }) => (
            <SeugestionCard
              onPress={() => handleSelectSugestion(sugestion.title)}
            >
              <SugestionName>{sugestion.title}</SugestionName>
            </SeugestionCard>
          )}
        />
      </RBSheet>
    </Container>
  );
};

export default CreateEvent;
