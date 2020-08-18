import React, { useState, useEffect, useCallback } from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  Container,
  Header,
  PageTitle,
  SectionTitle,
  SectionMessages,
  MessageButtom,
  ImageMessageContent,
  EmptyView,
  EmptyViewText,
} from './styles';

import MessageModal from './MessageModal';

import api from '../../services/api';

interface Message {
  id: string;
  message_type: string;
  message_content: string;
}

interface MessagesData {
  message_type: string;
  messages: Message[];
}

const MyMessages: React.FC = () => {
  const [messages, setMessages] = useState<MessagesData[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    async function loadMessages() {
      const response = await api.get('/messages');

      setMessages(response.data);
    }

    loadMessages();
  }, []);

  const handlToggleModal = useCallback(() => {
    setIsVisible(state => !state);
  }, []);

  const handleShowMessage = useCallback(
    (image_uri: string) => {
      handlToggleModal();
      setSelectedImage(image_uri);
    },
    [handlToggleModal],
  );

  return (
    <Container>
      <Header>
        <MaterialCommunityIcons name="wechat" size={100} color="#65c4b0" />
        <PageTitle numberOfLines={4}>Minhas mensagens</PageTitle>
      </Header>

      {messages.map(message => (
        <>
          <SectionTitle key={message.message_type}>
            {`Mensagens de ${message.message_type}`}
          </SectionTitle>
          {message.messages.length ? (
            <SectionMessages>
              {message.messages.map(newMessage => (
                <MessageButtom
                  onPress={() => handleShowMessage(newMessage.message_content)}
                  key={newMessage.id}
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,

                    elevation: 2,
                  }}
                >
                  <ImageMessageContent
                    source={{ uri: newMessage.message_content }}
                  />
                </MessageButtom>
              ))}
            </SectionMessages>
          ) : (
            <EmptyView>
              <MaterialCommunityIcons
                name="alert-circle-outline"
                color="#ddd"
                size={40}
              />
              <EmptyViewText>
                Não há mesnsages de texto cadastradas.
              </EmptyViewText>
            </EmptyView>
          )}
        </>
      ))}
      <MessageModal
        isVisible={isVisible}
        uri={selectedImage}
        onPress={handlToggleModal}
      />
    </Container>
  );
};

export default MyMessages;
