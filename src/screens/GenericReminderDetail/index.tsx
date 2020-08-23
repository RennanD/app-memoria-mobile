/* eslint-disable import/no-duplicates */
import React, { useState, useEffect, useCallback } from 'react';

import { Feather } from '@expo/vector-icons';

import { format, parseISO } from 'date-fns';
import ptbr from 'date-fns/locale/pt-BR';

import { Calendar } from 'react-native-calendars';

import { useRoute } from '@react-navigation/native';

import {
  Container,
  ListDatesTitle,
  ListDatesView,
  EventLabelText,
  EnventLabel,
  EmptyView,
  EventLabelDate,
  EmptyViewText,
  Description,
  FloatButton,
} from './styles';
import boxShadowEffect from '../../styles/boxShadow';

import api from '../../services/api';
import { CalendarPlaceholder } from './Placeholders';
import ReminderModal from '../../components/ReminderModal';

interface ImportantDate {
  id: string;
  date: Date;
  description: string;
}

interface Reminder {
  _id: string;
  title: string;
  reminderDate: string;
  notification_message: string;
  formattedDate: string;
}

interface RouteProps {
  key: string;
  name: string;
  params: {
    important_date_id: string;
  };
}

const GenericReminderDetail: React.FC = () => {
  const { params } = useRoute<RouteProps>();

  const [calendarLoading, setCalendarLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [current, setCurrent] = useState<string>('');
  const [importantDate, setImportantDate] = useState<ImportantDate>(
    {} as ImportantDate,
  );
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const toggleModal = useCallback(() => {
    setIsVisible(state => !state);
  }, []);

  useEffect(() => {
    async function loadDate() {
      setCalendarLoading(true);
      const response = await api.get(
        `/user-generic-dates/${params.important_date_id}`,
      );
      const currentYear = new Date().getFullYear();

      const currentDate = format(parseISO(response.data.date), "MM'-'dd");

      setImportantDate(response.data);
      setCurrent(`${currentYear}-${currentDate}`);
      setCalendarLoading(false);
    }

    loadDate();
  }, [params]);

  useEffect(() => {
    async function loadReminders() {
      const response = await api.get('/reminders', {
        params: {
          important_date_id: importantDate.id,
        },
      });

      const data = response.data.map((reminder: Reminder) => ({
        ...reminder,
        formattedDate: format(
          parseISO(reminder.reminderDate),
          "dd 'de' MMMM 'de' yyyy",
          {
            locale: ptbr,
          },
        ),
      }));

      setReminders(data);
    }

    loadReminders();
  }, [importantDate.id]);

  return (
    <>
      <Container>
        {!calendarLoading ? (
          <>
            <Calendar
              monthFormat="MMM yyyy"
              hideArrows={false}
              current={current}
              markedDates={{
                [current]: { selected: true, selectedColor: '#65c4b0' },
              }}
              disableArrowLeft
              disableArrowRight
            />

            <ListDatesTitle>Descrição</ListDatesTitle>

            <Description>{importantDate.description}</Description>

            <ListDatesTitle>Lembretes</ListDatesTitle>
          </>
        ) : (
          <CalendarPlaceholder />
        )}
        <ListDatesView>
          {reminders.length > 0 ? (
            reminders.map(reminder => (
              <EnventLabel key={reminder._id} style={boxShadowEffect}>
                <EventLabelText>{reminder.title}</EventLabelText>
                <EventLabelDate>
                  {`Data do lembrete: ${reminder.formattedDate} `}
                </EventLabelDate>
              </EnventLabel>
            ))
          ) : (
            <EmptyView>
              <Feather name="calendar" size={28} color="#ddd" />
              <EmptyViewText>Não há lembretes para esta data</EmptyViewText>
            </EmptyView>
          )}
        </ListDatesView>

        {importantDate && (
          <ReminderModal
            isVisible={isVisible}
            title={importantDate.description}
            important_date_id={importantDate.id}
            toggleModal={toggleModal}
            dateReminder={importantDate.date}
          />
        )}
      </Container>
      <FloatButton onPress={toggleModal} style={boxShadowEffect}>
        <Feather name="plus" color="#fff" size={24} />
      </FloatButton>
    </>
  );
};

export default GenericReminderDetail;
