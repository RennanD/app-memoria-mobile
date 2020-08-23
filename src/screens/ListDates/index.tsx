import React, { useState, useEffect, useCallback } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Header,
  PageTitle,
  ListDatesItem,
  ListDatesDay,
  ListDatesMonth,
  ListDatesText,
  ListDatesView,
  EnventLabel,
  EventLabelText,
  EmptyView,
  EmptyViewText,
} from './styles';

import ListDateHeader from '../../components/ListDateHeader';

import api from '../../services/api';

interface Events {
  monthDay: number;
  type: 'generic-date' | 'important-date';
  id: string;
  contact_id?: string;
  user_id: string;
  date: Date;
  description: string;
}

interface ImportantDates {
  monthDay: number;
  events: Events[];
}

const ListDates: React.FC = () => {
  const [dates, setDates] = useState<ImportantDates[]>([] as ImportantDates[]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const { navigate } = useNavigation();

  const handleShowDate = useCallback(
    (eventId: string, route: string) => {
      navigate(route, { important_date_id: eventId });
    },
    [navigate],
  );

  useEffect(() => {
    async function loadDates() {
      const response = await api.get('/dates', {
        params: {
          month,
        },
      });

      function sortData(bigger: Events, smaller: Events) {
        if (bigger.monthDay < smaller.monthDay) {
          return -1;
        }

        if (bigger.monthDay > smaller.monthDay) {
          return 1;
        }
        return 0;
      }

      const data = response.data.sort(sortData);

      setDates(data);
    }

    loadDates();
  }, [month]);

  if (!dates.length) {
    return (
      <Container>
        <Header>
          <MaterialCommunityIcons
            name="calendar-month"
            size={48}
            color="#fff"
          />
          <PageTitle>Datas importantes</PageTitle>
        </Header>

        <ListDateHeader
          onChangeMonth={value => setMonth(Number(value))}
          currentMonth={String(month)}
        />

        <EmptyView>
          <MaterialCommunityIcons
            name="calendar-remove-outline"
            color="#ddd"
            size={40}
          />
          <EmptyViewText>
            Não há datas cadastradas, selecione outro mês para continuar
          </EmptyViewText>
        </EmptyView>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <MaterialCommunityIcons name="calendar-month" size={48} color="#fff" />
        <PageTitle>Datas importantes</PageTitle>
      </Header>

      <ListDateHeader
        onChangeMonth={value => setMonth(Number(value))}
        currentMonth={String(month)}
      />

      <ListDatesItem>
        <ListDatesDay>
          <ListDatesText>Dia</ListDatesText>
        </ListDatesDay>

        <ListDatesMonth>
          <ListDatesText>Eventos</ListDatesText>
        </ListDatesMonth>
      </ListDatesItem>

      <ListDatesView>
        {dates.map(dateItem => (
          <ListDatesItem>
            <ListDatesDay>
              <ListDatesText>{dateItem.monthDay}</ListDatesText>
            </ListDatesDay>

            <ListDatesMonth>
              {dateItem.events.map(event => {
                if (event.type === 'important-date') {
                  return (
                    <EnventLabel
                      key={event.id}
                      onPress={() => handleShowDate(event.id, 'ReminderDetail')}
                    >
                      <EventLabelText>{event.description}</EventLabelText>
                    </EnventLabel>
                  );
                }
                return (
                  <EnventLabel
                    key={event.id}
                    onPress={() => {
                      handleShowDate(event.id, 'GenericReminderDetail');
                    }}
                    style={{ backgroundColor: '#2193f6' }}
                  >
                    <EventLabelText>{event.description}</EventLabelText>
                  </EnventLabel>
                );
              })}
            </ListDatesMonth>
          </ListDatesItem>
        ))}
      </ListDatesView>
    </Container>
  );
};

export default ListDates;
