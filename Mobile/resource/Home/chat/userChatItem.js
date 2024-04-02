import react, {useState, useEffect} from 'react';
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {images, colors, fontSize} from '../../../constant';
import {Image} from 'react-native';
import {UIInput} from '../../../components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowRightToBracket} from '@fortawesome/free-solid-svg-icons/faArrowRightToBracket';
import {height} from '@fortawesome/free-solid-svg-icons/faMugSaucer';
import {AppRegistry} from 'react-native';
import {Button, Icon, WhiteSpace, WingBlank} from '@ant-design/react-native';
import RenderViewChat from './viewChat';
import {DrawerActions, useNavigation} from '@react-navigation/native';

function UserChatItem(props) {
  const {data} = props;
  const navigation = useNavigation();
  const [avatarChat, setAvatarChat] = useState(
    'https://static.vecteezy.com/system/resources/previews/024/766/958/original/default-male-avatar-profile-icon-social-media-user-free-vector.jpg',
  );
  const [nameChat, setNameChat] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const fetchDataChatItem = async () => {
    try {
      if (data.member.chatType === 'single') {
        setNameChat(data.objectChat.firstName + ' ' + data.objectChat.lastName);
      } else {
        setNameChat(data.objectChat.groupName);
      }
      setAvatarChat(data.objectChat.avatar);
      setNewMessage(data.newMessage.content);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchDataChatItem();
  }, []);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('RenderViewChat')}>
      <View
        style={{
          margin: 15,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
          <Image
            source={{uri: avatarChat}}
            style={{
              marginRight: 15,
              width: 50,
              height: 50,
              borderRadius: 100,
            }}></Image>
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-around',
            }}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: fontSize.h3,
              }}>
              {nameChat}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: fontSize.h4,
                width: 310,
              }}>
              {newMessage}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default UserChatItem;
