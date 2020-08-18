import React, { useCallback } from 'react';

import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

import Modal from 'react-native-modal';

import { Alert } from 'react-native';
import {
  Container,
  Content,
  Image,
  ConfirmButton,
  CancelButton,
  ButtonText,
} from './styles';

interface MessageModalProps {
  uri: string;
  isVisible: boolean;
  onPress(): void;
}

const MessageModal: React.FC<MessageModalProps> = ({
  uri: image_uri,
  onPress,
  isVisible,
}) => {
  const handleShareMessage = useCallback(async () => {
    const downloadResumable = FileSystem.createDownloadResumable(
      image_uri,
      `${FileSystem.documentDirectory}${new Date().getTime()}.jpeg`,
      {},
    );

    try {
      const { uri } = await downloadResumable.downloadAsync();
      console.log('Finished downloading to ', uri);
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert("Uh oh, sharing isn't available on your platform");
        return;
      }

      await Sharing.shareAsync(uri);
    } catch (e) {
      console.error(e);
    }
  }, [image_uri]);

  return (
    <Modal
      useNativeDriver
      style={{ margin: 0, justifyContent: 'flex-end' }}
      isVisible={isVisible}
    >
      <Container>
        <Content>
          <Image source={{ uri: image_uri }} />
          <ConfirmButton onPress={handleShareMessage}>
            <ButtonText>Compartilhar</ButtonText>
          </ConfirmButton>

          <CancelButton onPress={onPress}>
            <ButtonText>Fechar</ButtonText>
          </CancelButton>
        </Content>
      </Container>
    </Modal>
  );
};

export default MessageModal;
