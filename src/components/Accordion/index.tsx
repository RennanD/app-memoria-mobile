import React, { useCallback } from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  Container,
  PreferencesButton,
  PreferencesButtonText,
  PreferencesItem,
  PreferencesItemText,
} from './styles';

interface AccordionProps {
  title: string;
  onPress(): void;
  opened: boolean;
  items: string[];
  selectedItems: string[];
  onSelectItem(category: string, subcategory: string): void;
}
const Accordion: React.FC<AccordionProps> = ({
  onPress,
  opened = false,
  items,
  title,
  onSelectItem,
  selectedItems,
}) => {
  const handleSelectItem = useCallback(
    (item: string) => {
      onSelectItem(title, item);
    },
    [onSelectItem, title],
  );

  return (
    <Container>
      <PreferencesButton onPress={onPress}>
        <PreferencesButtonText>{title}</PreferencesButtonText>
        <MaterialCommunityIcons
          name={opened ? 'chevron-down' : 'chevron-right'}
          color="#FFF"
          size={24}
        />
      </PreferencesButton>
      {opened && (
        <>
          {items.map(item => (
            <PreferencesItem
              key={item}
              selected={selectedItems.includes(item)}
              onPress={() => handleSelectItem(item)}
            >
              <PreferencesItemText selected={selectedItems.includes(item)}>
                {item}
              </PreferencesItemText>
            </PreferencesItem>
          ))}
        </>
      )}
    </Container>
  );
};

export default Accordion;
