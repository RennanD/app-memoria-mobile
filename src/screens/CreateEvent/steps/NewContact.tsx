import React, { useCallback, useRef, useState } from 'react';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useNavigation, useRoute } from '@react-navigation/native';

import { subDays } from 'date-fns';
import { Alert } from 'react-native';
import { Container, Header, PageTitle } from './styles';

import { Calendar } from '../../../assets';

import Input from '../../../components/TextInput';
import PikerBottomInput from '../../../components/PikerBottomInput';
import Button from '../../../components/Button';

import reminderFrequence from '../reminderFrequence';
import api from '../../../services/api';

interface RouteProps {
  key: string;
  name: string;
  params: {
    date: Date;
    suguestion: string;
  };
}

interface FormData {
  description: string;
  frequence: string;
  reminderHour: string;
  subDays?: string;
}

const pickerItems = [
  {
    label: 'Pai',
    value: 'pai',
  },
  {
    label: 'Mãe',
    value: 'mãe',
  },
  {
    label: 'Avó',
    value: 'avó',
  },
  {
    label: 'Avô',
    value: 'avô',
  },
  {
    label: 'Tio',
    value: 'tio',
  },
  {
    label: 'Tia',
    value: 'tia',
  },
  {
    label: 'Irmão',
    value: 'irmão',
  },
  {
    label: 'Irmã',
    value: 'irmã',
  },
  {
    label: 'Primo',
    value: 'primo',
  },
  {
    label: 'Prima',
    value: 'prima',
  },
  {
    label: 'Amigo',
    value: 'amigo',
  },
  {
    label: 'Amiga',
    value: 'amiga',
  },
  {
    label: 'Namorada',
    value: 'namorada',
  },
];

const NewContact: React.FC = () => {
  const [selectedFrequence, setSelectedFrequence] = useState('');

  const formRef = useRef<FormHandles>(null);

  const { params } = useRoute<RouteProps>();
  const { goBack } = useNavigation();

  const handleSubmitForm = useCallback(
    async (data: FormData) => {
      let reminderCron = '';
      if (data.frequence === 'week') {
        reminderCron = `${data.reminderHour} * * ${params.date.getDay()}`;
      }

      if (data.frequence === 'month') {
        reminderCron = `${data.reminderHour} ${params.date.getDate()} * *`;
      }

      if (data.frequence === 'day' && data.subDays) {
        let initMonth = 0;
        let endMonth = 0;
        const days = [];
        for (let count = Number(data.subDays); count >= 1; count -= 1) {
          const subDay = subDays(params.date, Number(count));

          if (count >= Number(data.subDays)) {
            initMonth = subDay.getMonth() + 1;
          }

          if (count <= 1) {
            endMonth = subDay.getMonth() + 1;
          }

          days.push(`${subDay.getDate()}`);
        }

        if (endMonth !== initMonth) {
          reminderCron = `${data.reminderHour} ${String(
            days,
          )} ${initMonth}-${endMonth} *`;
        } else {
          reminderCron = `${data.reminderHour} ${String(days)} ${initMonth} *`;
        }
      }

      const response = await api.post('/user-generic-dates', {
        date: params.date,
        description: data.description,
      });

      await api.post('/reminders', {
        important_date_id: response.data.id,
        notification_message: `Você adicionou um lembrete para "${data.description}"`,
        title: 'Lembrete de uma data especial 🤩 🥳 ',
        reminderDate: params.date,
        parsed_date: 'mm-yy',
        date: reminderCron,
      });

      Alert.alert('Sucesso', 'Data cadastrada com sucesso!');
      goBack();
    },
    [goBack, params.date],
  );

  return (
    <Container>
      <Header>
        <Calendar height="60" width="60" />
        <PageTitle>Envento para um contato</PageTitle>
      </Header>
      <Form ref={formRef} onSubmit={handleSubmitForm}>
        <Input
          name="friend_name"
          icon="account"
          placeholder="Nome do contato"
          borderColor="#ddd"
        />

        <Input
          name="description"
          icon="card-text-outline"
          placeholder="Descrição"
          borderColor="#ddd"
          defaultValue={params.suguestion}
        />
        {/* <BottomSheetContactsSelect name="contact" /> */}

        <PikerBottomInput
          name="relationship"
          placeholder="Relacionamento"
          items={pickerItems}
          icon="account-heart-outline"
        />

        <PikerBottomInput
          name="frequence"
          placeholder="Frequência do lembrete"
          items={reminderFrequence}
          icon="calendar"
          onChage={setSelectedFrequence}
        />
        {selectedFrequence === 'day' && (
          <PikerBottomInput
            name="subDays"
            placeholder="Dias de antecedências"
            icon="calendar"
            items={[
              { label: '3 dias', value: '3' },
              { label: '5 dias', value: '5' },
              { label: '1 semana', value: '7' },
            ]}
          />
        )}

        <PikerBottomInput
          name="reminderHour"
          placeholder="Horário para o lembrete"
          icon="clock"
          items={[
            { label: '8hrs', value: '0 8' },
            { label: '9hrs', value: '0 9' },
            { label: '10hrs', value: '0 10' },
            { label: '11hrs', value: '0 11' },
            { label: '13hrs', value: '0 13' },
            { label: '14hrs', value: '0 14' },
            { label: '15hrs', value: '0 15' },
            { label: '16hrs', value: '0 16' },
            { label: '17hrs', value: '0 17' },
            { label: '18hrs', value: '0 18' },
            { label: '19hrs', value: '0 19' },
            { label: '20hrs', value: '0 20' },
          ]}
        />
        <Button loading={false} onPress={() => formRef.current?.submitForm()}>
          Cadastrar data
        </Button>
      </Form>
    </Container>
  );
};

export default NewContact;
