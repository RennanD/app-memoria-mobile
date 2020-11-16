import React, { useState, useEffect, useCallback } from 'react';

import { Feather } from '@expo/vector-icons';

import {
  Container,
  Header,
  PageTitle,
  PreferencesAccordionList,
} from './styles';

import PreferencesAccordion from '../../components/PreferencesAccordion';

import api from '../../services/api';

interface PreferenceProps {
  category: string;
  subcategories: string[];
}

const MyPreferences: React.FC = () => {
  const [preferences, setPreferences] = useState<PreferenceProps[]>(
    [] as PreferenceProps[],
  );
  const [activeItem, setActiveItem] = useState('');

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

  useEffect(() => {
    async function loadPreferences() {
      const response = await api.get('/preferences/person');

      setPreferences(response.data);
    }

    loadPreferences();
  }, []);

  return (
    <Container>
      <Header>
        <Feather name="heart" color="#25A182" size={100} />
        <PageTitle>Gostos e preferências</PageTitle>
      </Header>

      <PreferencesAccordionList>
        {preferences.map(preference => (
          <PreferencesAccordion
            items={preference.subcategories}
            onPress={() => handleToggleAccordion(preference.category)}
            opened={activeItem === preference.category}
            title={preference.category}
          />
        ))}
      </PreferencesAccordionList>
    </Container>
  );
};

export default MyPreferences;
