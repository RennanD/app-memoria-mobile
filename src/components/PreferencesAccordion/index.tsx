import React from 'react';
import { TouchableOpacity } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  Container,
  PreferencesButton,
  PreferencesButtonText,
  PreferencesItemList,
  PreferencesItem,
  PreferencesItemText,
} from './styles';

interface AccordionProps {
  title: string;
  onPress(): void;
  opened: boolean;
  items: string[];
}
const PreferencesAccordion: React.FC<AccordionProps> = ({
  onPress,
  opened = false,
  items,
  title,
}) => (
  <Container>
    <PreferencesButton onPress={onPress}>
      <PreferencesButtonText>{title}</PreferencesButtonText>
      <MaterialCommunityIcons
        name={opened ? 'chevron-down' : 'chevron-right'}
        color="#65c4b0"
        size={24}
      />
    </PreferencesButton>
    {opened && (
      <PreferencesItemList>
        {items.map(preference => (
          <PreferencesItem
            key={preference}
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.18,
              shadowRadius: 1.0,

              elevation: 1,
            }}
          >
            <PreferencesItemText>{preference}</PreferencesItemText>
            <TouchableOpacity>
              <MaterialCommunityIcons name="close" size={20} color="#333" />
            </TouchableOpacity>
          </PreferencesItem>
        ))}
      </PreferencesItemList>
    )}
  </Container>
);

export default PreferencesAccordion;
