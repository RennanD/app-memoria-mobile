/* eslint-disable no-unused-expressions */
import React, { useState, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';

import {
  Container,
  Header,
  PageTitle,
  PreferencesContainer,
  SubmitButton,
  SubmitButtonText,
} from './styles';
import boxShadownEffect from '../../styles/boxShadow';

import Accordion from '../../components/Accordion';

import api from '../../services/api';

import { useAuth } from '../../hooks';

interface PreferenceItemProps {
  category: string;
  subcategory: string;
}

interface StatePreferenceItemProps {
  category: string;
  subcategories: string[];
}

const Preferences: React.FC = () => {
  const [activeItem, setActiveItem] = useState('');
  const [preferencesItems, setPreferencesItems] = useState<
    StatePreferenceItemProps[]
  >([] as StatePreferenceItemProps[]);
  const [selectItems, setSelectItems] = useState<PreferenceItemProps[]>(
    [] as PreferenceItemProps[],
  );
  const [selectedSubategories, setSelectedSubcategories] = useState<string[]>(
    [] as string[],
  );

  const { account } = useAuth();

  useEffect(() => {
    async function loadPreferences() {
      const response = await api.get('/preferences/list');
      setPreferencesItems(response.data);
    }

    loadPreferences();
  }, []);

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

  const handleSelectItem = useCallback(
    (category: string, subcategory: string) => {
      const newPreference = {
        category,
        subcategory,
      };

      const existentSubcategory = selectedSubategories.find(
        selectedSubategory => selectedSubategory === subcategory,
      );

      if (existentSubcategory) {
        const filteredSubcategories = selectedSubategories.filter(
          selectedSubategory => selectedSubategory !== subcategory,
        );
        setSelectedSubcategories(filteredSubcategories);
      } else {
        setSelectedSubcategories([...selectedSubategories, subcategory]);
      }

      const existentPreference = selectItems.find(
        seletcItem => seletcItem.subcategory === newPreference.category,
      );

      if (existentPreference) {
        const filteredItem = selectItems.filter(
          item => item !== existentPreference,
        );
        setSelectItems(filteredItem);
      } else {
        setSelectItems([...selectItems, newPreference]);
      }
    },
    [selectItems, selectedSubategories],
  );

  const handleSubmit = useCallback(async () => {
    if (!selectItems.length) {
      Alert.alert('Erro', 'Adicione pelo menos uma preferência.');
    } else {
      const reducedItems = selectItems.filter(
        (selectItem, index, array) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          array
            .map(mapItem => mapItem.category)
            .indexOf(selectItem.category) === index,
      );

      const finalPreferences = reducedItems.map(preference => {
        const categoriesMap = selectItems.filter(selectItem => {
          if (selectItem.category === preference.category) {
            return selectItem.subcategory;
          }

          return '';
        });

        return {
          category: preference.category,
          subcategories: categoriesMap.map(
            preferenceItem => preferenceItem.subcategory,
          ),
        };
      });

      const response = await api.post(
        `/preferences/person/${account.user.id}`,
        {
          preferences: finalPreferences,
        },
      );

      Alert.alert('Sucesso', response.data.content);
    }
  }, [selectItems, account.user.id]);

  return (
    <Container>
      <Header>
        <PageTitle>
          Escolha aqui suas preferências e seu gostos pessoais
        </PageTitle>
      </Header>
      <PreferencesContainer>
        {preferencesItems.map(preference => (
          <Accordion
            key={preference.category}
            title={preference.category}
            onPress={() => handleToggleAccordion(preference.category)}
            opened={activeItem === preference.category}
            items={preference.subcategories}
            onSelectItem={handleSelectItem}
            selectedItems={selectedSubategories}
          />
        ))}
      </PreferencesContainer>

      <SubmitButton onPress={handleSubmit} style={boxShadownEffect}>
        <SubmitButtonText>Adicionar</SubmitButtonText>
      </SubmitButton>
    </Container>
  );
};

export default Preferences;
