import React, { useCallback, useEffect, useState } from 'react';
import { Linking } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as Contacts from 'expo-contacts';

import {
  Container,
  Header,
  PageTitle,
  EnviteButton,
  EnviteButtonText,
  Content,
  ContactAvatar,
  ContactCard,
  ContactName,
} from './styles';

interface PhoneContact {
  firstName: string | undefined;
  phoneNumber: string | undefined;
  originalPhone: string | undefined;
}

const EnviteFriends: React.FC = () => {
  const [phoneContacts, setPhoneContacts] = useState<PhoneContact[]>([]);

  const handleInviteContact = useCallback(phoneNumber => {
    // eslint-disable-next-line prettier/prettier
    const message = 'Olá, gostaria de fazer parte dos seus contatos no Memória e adicionar você nos meus contatos. \n Clique para abrir o convite:  http://10.0.0.103:3000/accept-envites';

    Linking.openURL(`whatsapp://send?phone=${phoneNumber}&text=${message}`);
  }, []);

  const handleShareApp = useCallback(() => {
    // eslint-disable-next-line prettier/prettier
    const message = 'Olá, estou o app Mémoria, venha aproveitar você também essa novidade, clique aqui para fazer o download \n https://drive.google.com/drive/folders/1700p2GAdCWUo6mWVUYcNYYUkxyiHcWLZ?usp=sharing';

    Linking.openURL(`whatsapp://send?text=${message}`);
  }, []);

  useEffect(() => {
    async function loadContacts() {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          const contact = data;
          const dataPhone = contact.map(contactPhone => {
            let phoneContact = {} as PhoneContact;
            if (contactPhone.phoneNumbers) {
              const phoneNumber = contactPhone.phoneNumbers[0].number;

              const parsedPhone = phoneNumber
                ?.replace(' ', '')
                .replace(' ', '')
                .replace('+55', '')
                .replace('-', '')
                .replace(' -', '');

              phoneContact = {
                firstName: `${contactPhone.firstName} ${contactPhone.lastName}`,
                phoneNumber:
                  parsedPhone?.length === 9
                    ? `+55${parsedPhone}`
                    : `+559${parsedPhone}`,
                originalPhone: phoneNumber,
              };
            }
            return phoneContact;
          });

          setPhoneContacts(dataPhone);
        }
      }
    }
    loadContacts();
  }, []);

  return (
    <Container>
      <Header>
        <MaterialCommunityIcons
          name="account-group"
          color="#65c4b0"
          size={100}
        />
        <PageTitle>Condive pessoas</PageTitle>
      </Header>

      <EnviteButton onPress={handleShareApp}>
        <EnviteButtonText>Compartilhar via whatsapp</EnviteButtonText>
      </EnviteButton>

      <Content>
        {phoneContacts.map(phoneContact => (
          <ContactCard
            onPress={() => handleInviteContact(phoneContact.originalPhone)}
          >
            <ContactAvatar
              source={{
                uri:
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEUZp5z///8AopbO6eYAoJT7/v7z+/rr9/YApZrn9fT2/PyP0swvsKbG6OXf8/HB5uO14NzX8O6k3NeAzMZjwLhMubA0r6WZ1tF8y8Ww4NwgqqBEtKtYvbSJ0MqY1M7K6eZvxL5UubBhv7fsyW+yAAAE+klEQVR4nO2d3ZqiMAxAgRGIgogoqKCivv9DLowzuzozrm1DbcLkXHnJ+fqbtKmeJwiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCMDQAQcfkg+4ngOtPGhLw0madFIss9nvCeJkXq0tTj8US0vVmns38L0RZnuxr/o4QpIdl9NXugzBebOuAtSR45zx8oPfZlEnj+isRQFnE//fryY5c+yrAevrcr6ctWSpCk6v5dYQbj58jNEtlwY5dxU0RSi1B31+kvBRhrTDF3JOxmm+gUZxjbskZtSLUrb6g7xeuv1udWn0WvSPh0ojB6tsmVI2oYaIIBoPwSs7DEApTQT9ccVCEUnuh+Edbuf58FTbmgn54ot+I0GQIQ78NXAs8BVZPAsInjUg/WgwWGEHfP5DvpumjlIUi89q1wRNgjxP0p9S7KRyQhtGaejc13JL+JTy6NnhCrRn4fmfnWuEJqfGe9JOc+FRjEvres6BtiNqUXiG+NYXz6A1H34bjH4e/wBC/WozfMHet8AT8noZ61rRGhof9MRRxdkjDGfUQGDB5qJ6Iei4KtkjD+ELdcI01pH7iDSXSMEtdKzwDm4mivuB3jYhcEAvinRSfL6V/NhMkOEPqE00/mRoej16JyA/DLn5CnczMGZzMlG8YQ+q5xPfDNdzZ0478emh+xH1lRn0yHX2MP/5c2y/Il47e8BdkE2vUet9DPdeGzmKQXy3GH+OjI+CW+DDsoifkQT71ZGJ/JwpnSL6TYlfEKXnBbiDOMYY7+vEhMq9Pfa3ogQQRIM6oZ7x7YI8YiEvim9IPEGkM+kmMHrgYC0Z7Bp3U61OmhvuaGfWTtX+cTFaMcMFH0Owe7ZRLxcw7tUHim/6e+xaTwiAmJUEfTAwG4pHDhu0vgUGoTz+quAVO+oashqFJDJWxakLPq7QPu3NWw9CkUDZhZqidVQzJV5J8Adaae9Ml9Wqgb1Saaz71ZP4P6A3EMHH9vdpoJr+nvNb7d2qtbkr9POYn9DZuTIL7e3QeqGFQ4PwTR+W0IqP0xS0aT7gwXCreCVQDjPjMsgk7QDFzuuEq2EWJSumaiPxFr4dAqXRvoWXbhF0crDTXvDE2HH0bKkb63KL7W9S2NQsxJEyltCBy7qWVUuq7YGyYKr29J4aUUbtbw9lQbaZhcUvoAeNfLUZvOP59qeL1qMz1d5oDJ6Vc1IxplqZ/U18xs3/iORABGtV7mGHC7jXv3q86qpdehO2J11vXEEBZ6NUhRm+HmsMfl0D3iXV13u5MKmfCdnNpqtqjqtnJ1Wl5OhSLpfkN2jBr8+Pq0qTENPtemZbbzTyLI1SJ7NVyFk+zXXJKqfTabkrpeiWi3R6aTtvNyf2/7YB3TuYxvuEeWuarxqEjBN7eot6VWVyUjhzBazboYkM1llsXV/jhXKCf9dJwPL76ryGCOhl+bvm/4/aVfRVe7teTXV4neMY+FmzGrHjRXfdgha7XNiUrXxBnQYV9cw5DeLQeLUODKi/EK9qujAJ8vT2WndVWRP61wzDkNi82pNiXLQfB4oNnE+zzOgOxtjWjot9LGAprl1FT1BtXQ2JpQkX+v8qQWLoIp3ZU9hqsHMhp1xfYJLaxKGIfRBwWG3NN4Ha79gUbT6BMHISEj7FxB2fiWuqOpQXD4I0SVu5vBKSwICgIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAI4+cPwu9UYzcy1TkAAAAASUVORK5CYII=',
              }}
            />
            <ContactName>{phoneContact.firstName}</ContactName>
          </ContactCard>
        ))}
      </Content>
    </Container>
  );
};

export default EnviteFriends;
