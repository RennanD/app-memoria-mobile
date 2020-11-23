import React, { useCallback, useRef, useState } from 'react';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useRoute } from '@react-navigation/native';

import { subDays } from 'date-fns';
import { Container, Header, PageTitle } from './styles';

import { Calendar } from '../../../assets';

import BottomSheetContactsSelect from '../../../components/BottomSheetContactsSelect';
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
  };
}

interface FormData {
  description: string;
  contact: string;
  frequence: string;
  reminderHour: string;
  subDays?: string;
}

// const reminderObjetc = {
//   important_date_id,
//   notification_message: data.notification_message,
//   title,
//   reminderDate: subDaysReminder,
//   parsed_date: stringDate,
//   date: `${data.hour} ${getDay} ${getMonth} *`,
// };

const WithContact: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [selectedFrequence, setSelectedFrequence] = useState('');

  const { params } = useRoute<RouteProps>();

  const handleSubmitForm = useCallback(
    (data: FormData) => {
      let reminderCron = '';
      if (data.frequence === 'week') {
        reminderCron = `${data.reminderHour} * * ${params.date.getDay()}`;
      }

      if (data.frequence === 'mount') {
        reminderCron = `${data.reminderHour} ${params.date.getMonth() + 1} * *`;
      }

      if (data.frequence === 'day' && data.subDays) {
        let initMonth = 0;
        let endMonth = 0;
        const days = [];
        for (let count = Number(data.subDays); count >= 1; count -= 1) {
          const subDay = subDays(params.date, Number(data.subDays));

          if (count >= Number(data.subDays)) {
            initMonth = subDay.getMonth() + 1;
          }

          if (count <= 1) {
            endMonth = subDay.getMonth() + 1;
          }
        }

        // if
      }
      // await api.post('/dates', {
      //   contact_id,
      //   date,
      //   description,
      // });
    },
    [params.date],
  );

  return (
    <Container>
      <Header>
        <Calendar height="60" width="60" />
        <PageTitle>Envento para um contato</PageTitle>
      </Header>
      <Form ref={formRef} onSubmit={handleSubmitForm}>
        <Input
          name="description"
          icon="card-text-outline"
          placeholder="Descrição"
          borderColor="#ddd"
        />
        <BottomSheetContactsSelect name="contact" />

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

export default WithContact;
