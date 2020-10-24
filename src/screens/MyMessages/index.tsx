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
} from './styles';

import MessageModal from './MessageModal';

import api from '../../services/api';
import EmptyView from '../../components/EmptyView';

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

  if (!messages.length) {
    return (
      <Container>
        <Header>
          <MaterialCommunityIcons name="wechat" size={100} color="#65c4b0" />
          <PageTitle numberOfLines={4}>
            Escolha e envie alguma mensagem
          </PageTitle>
        </Header>

        <EmptyView
          text="Ainda não há mensagens cadastradas"
          icon="message-circle"
        />
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <MaterialCommunityIcons name="wechat" size={100} color="#65c4b0" />
        <PageTitle numberOfLines={4}>Escolha e envie alguma mensagem</PageTitle>
      </Header>

      {messages.map(message => (
        <>
          <SectionTitle key={message.message_type}>
            {`Mensagens de ${message.message_type}`}
          </SectionTitle>
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
                  resizeMode="contain"
                />
              </MessageButtom>
            ))}
          </SectionMessages>
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
