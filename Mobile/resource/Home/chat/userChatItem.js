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
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons/faEllipsisVertical';
import {height} from '@fortawesome/free-solid-svg-icons/faMugSaucer';
import {AppRegistry} from 'react-native';
import {Button, Icon, WhiteSpace, WingBlank} from '@ant-design/react-native';
import RenderViewChat from './viewChat';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {io} from 'socket.io-client';
import {deleteChat} from '../../../service/chat'

function UserChatItem(props) {
  // const [socket, setSocket] = useState(io.connect('http://192.168.0.173:2090'));

  // useEffect(() => {
  //   socket.on('connection', () => {
  //     console.log('Connected to the Socket.IO server');
  //   });
  // }, []);

  var {data, myUserName, newMessageIO, setData} = props;
  const navigation = useNavigation();
  const [avatarChat, setAvatarChat] = useState(
    'https://static.vecteezy.com/system/resources/previews/024/766/958/original/default-male-avatar-profile-icon-social-media-user-free-vector.jpg',
  );
  const isNewMessage = false;
  const [nameChat, setNameChat] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const fetchDataChatItem = async () => {
    try {
      if (data.objectChat.chatType === 'single') {
        setNameChat(data.member[0].firstName + ' ' + data.member[0].lastName);
        setAvatarChat(data.member[0].avatar);
      } else {
        setNameChat(data.objectChat.groupName);
        setAvatarChat(data.objectChat.avatar);
      }

      setNewMessage(
        newMessageIO && newMessageIO.content !== ''
          ? newMessageIO.content
          : data.newMessage.content,
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setNewMessage(
      newMessageIO && newMessageIO.content !== ''
        ? newMessageIO.content
        : data.newMessage.content,
    );
  }, [newMessageIO]);

  const TruncatedText = ({text}) => {
    if (text.length <= isNewMessage ? 70 : 80) {
      return isNewMessage ? (
        <Text
          style={{
            fontWeight: 'bold',
          }}>
          {text}
        </Text>
      ) : (
        <Text>{text}</Text>
      ); // Trả về văn bản gốc nếu đủ ngắn
    }

    const truncatedText = text.substring(0, isNewMessage ? 70 : 80) + '...'; // Cắt đoạn văn bản khi quá dài

    return isNewMessage ? (
      <Text
        style={{
          fontWeight: 'bold',
        }}>
        {truncatedText}
      </Text>
    ) : (
      <Text>{truncatedText}</Text>
    );
  };

  useEffect(() => {
    fetchDataChatItem();
  }, []);

  const [isLongPress, setIsLongPress] = useState(false);
  const toggleButtonPress = () => {
    if (!isLongPress) {
      setIsLongPress(true);
    } else {
      setIsLongPress(false);
    }
  };

  const goViewChat = () => {
    setIsLongPress(false);
    data.objectChat.chatType === 'single'
      ? navigation.navigate('RenderViewChat', {
          dataChat: data,
          myUserNameOne: myUserName,
        })
      : navigation.navigate('RenderViewChatGroup', {
          dataChat: data,
          myUserNameOne: myUserName,
        });
  };

  const deleteChatButton = async () => {
    setData(prevData => prevData.filter(item => item.objectChat._id !== data.objectChat._id));
    await deleteChat({myUserName: myUserName, chatId: data.objectChat._id});
  }
  return (
    <View>
      <View
        style={{
          margin: 15,
          display: 'flex',
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={goViewChat} style={{}}>
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
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: fontSize.h4,
                    width: isNewMessage ? 200 : 270,
                  }}>
                  <TruncatedText text={newMessage} />
                </Text>

                {isNewMessage ? (
                  <View
                    style={{
                      backgroundColor: colors.colorBgButton,
                      width: 9,
                      height: 9,
                      borderRadius: 100,
                    }}></View>
                ) : (
                  <></>
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleButtonPress}
          style={{
            width: 50,
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FontAwesomeIcon
            color={colors.primary}
            style={{}}
            size={20}
            icon={faEllipsisVertical}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: 382,
          height: 40,
          display: isLongPress ? 'flex' : 'none',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
        <View
          style={{
            backgroundColor: colors.bgHeader,
            width: 210,
            height: 40,
            marginLeft: 50,
            borderRadius: 13,
          }}>
          <TouchableOpacity
            onPress={deleteChatButton}
            style={{
              width: 250,
              height: 30,
              paddingLeft: 10,
              paddingTop: 10,
            }}>
            <Text
              style={{
                color: 'red',
              }}>
              Xóa cuộc hội thoại
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default UserChatItem;
