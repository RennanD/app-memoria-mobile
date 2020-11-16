import styled from 'styled-components/native';

interface ReinviteButtonTextProps {
  pressed: boolean;
}

export const Container = styled.View`
  flex: 1;
  background: #65c4b0;
`;

export const IconImage = styled.Image`
  align-self: center;
  height: 160px;
  width: 140px;
  margin: 30px 0;
`;

export const Content = styled.ScrollView`
  flex: 1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: #fff;
  padding: 20px;
`;

export const InfoText = styled.Text`
  color: #999;
  font-size: 18px;
  text-align: center;
  margin-top: 10px;
`;

export const ReenviteButton = styled.TouchableOpacity`
  margin-left: 5px;
`;

export const ReinviteButtonText = styled.Text<ReinviteButtonTextProps>`
  font-size: 18px;
  color: ${props => (props.pressed ? '#eee' : '#65c4b0')};
`;

export const CodeInput = styled.TextInput`
  margin-top: 30px;
  height: 50px;
  border: 1px solid #ddd;
  padding: 0 10px;
  align-items: center;
  flex-direction: row;
  margin-bottom: 5px;
  border-radius: 20px;
  text-align: center;
  font-size: 22px;
  color: #333;
`;
