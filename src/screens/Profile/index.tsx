/* eslint-disable import/no-duplicates */
import React, { useState, useEffect, useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Platform, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';

import { Feather } from '@expo/vector-icons';

import { format, parseISO } from 'date-fns';

import ptBr from 'date-fns/locale/pt-BR';

import {
  Container,
  Header,
  PageTitle,
  ContactDeatilsContainer,
  ContactAvatar,
  AvatartContainer,
  ChangeAvatarButton,
  ContactInfoContainer,
  ContactName,
  ContactDescription,
  PreferencesAccordionList,
  SectionTitle,
  SignOutButton,
  SignOutButtonText,
} from './styles';

import PreferencesAccordion from '../../components/PreferencesAccordion';

import { Profile as ProfileIcon } from '../../assets';

import { useAuth } from '../../hooks';
import api from '../../services/api';

interface PreferenceProps {
  category: string;
  subcategories: string[];
}

const Profile: React.FC = () => {
  const [preferences, setPreferences] = useState<PreferenceProps[]>(
    [] as PreferenceProps[],
  );
  const [activeItem, setActiveItem] = useState('');

  const { account, signOut, updateAvatar } = useAuth();

  const handleToggleAccordion = useCallback(
    (name: string) => {
      if (activeItem === name) {
        setActiveItem('');
        return;
      }
      setActiveItem(name);
    },
    [activeItem],
  );

  const handleChangeProfilePicture = useCallback(async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      // eslint-disable-next-line no-undef
      const dataFile = new FormData();

      dataFile.append('avatar', {
        uri: result.uri,
        name: 'picture.jpg',
        type: 'image/jpeg',
      });

      console.log(dataFile);
      const response = await api.patch('/users', dataFile);
      console.log(response.data);
      updateAvatar(response.data);
    } catch (E) {
      console.log(E);
    }
  }, [updateAvatar]);

  useEffect(() => {
    async function getGalleyPermission() {
      if (Platform.OS === 'ios') {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          Alert.alert(
            'Sorry, we need camera roll permissions to make this work!',
          );
        }
      }
    }

    getGalleyPermission();
  }, []);

  useEffect(() => {
    async function loadPreferences() {
      const response = await api.get(`/preferences/person/${account.user.id}`);

      setPreferences(response.data);
    }

    loadPreferences();
  }, [account.user.id]);

  return (
    <>
      <Container>
        <Header>
          <ProfileIcon width="60" height="60" />
          <PageTitle>Perfil do usuário</PageTitle>
        </Header>

        <ContactDeatilsContainer>
          <AvatartContainer>
            <ContactAvatar
              source={{
                uri: account.user.avatar,
              }}
            />

            <ChangeAvatarButton onPress={handleChangeProfilePicture}>
              <Feather name="camera" color="#fff" size={20} />
            </ChangeAvatarButton>
          </AvatartContainer>

          <ContactInfoContainer>
            <ContactName>{account.user.name}</ContactName>
            <ContactDescription>
              {`E-mail: ${account.user.email}`}
            </ContactDescription>

            <ContactDescription>
              {`Aniversário:  ${format(
                parseISO(account.user.birthday),
                "dd 'de' MMMM 'de' yyyy",
                { locale: ptBr },
              )}`}
            </ContactDescription>

            <SignOutButton onPress={signOut}>
              <SignOutButtonText>Sair</SignOutButtonText>
              <Feather name="log-in" color="#c53030" size={20} />
            </SignOutButton>
          </ContactInfoContainer>
        </ContactDeatilsContainer>

        <SectionTitle>Lista de preferências</SectionTitle>

        <PreferencesAccordionList>
          {preferences.map(preference => (
            <PreferencesAccordion
              key={preference.category}
              items={preference.subcategories}
              onPress={() => handleToggleAccordion(preference.category)}
              opened={activeItem === preference.category}
              title={preference.category}
            />
          ))}
        </PreferencesAccordionList>
      </Container>
    </>
  );
};

export default Profile;
