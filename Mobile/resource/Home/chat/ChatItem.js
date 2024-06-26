import react, {useEffect, useState} from 'react';
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
import UserChatItem from './userChatItem';
import axios from 'axios';
import {url} from '../../../service/cattalk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAllChat} from '../../../service/chat';
import {io} from 'socket.io-client';

// import { DemoBlock } from './demo'

const ChatItem = ({user}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessageNotify, setNewMessageNotify] = useState([]);
  const [myUserName, setMyUserName] = useState('');

  const [avatar, setAvatar] = useState(
    'https://static.vecteezy.com/system/resources/previews/024/766/958/original/default-male-avatar-profile-icon-social-media-user-free-vector.jpg',
  );

  const [socket, setSocket] = useState(io.connect('http://192.168.1.25:2090'));

  useEffect(() => {
    socket.on('receiveNotify', newMessage => {
      setData(prevData =>
        prevData.map(item => {
          if (item.newMessage && item.newMessage.chatId === newMessage.chatId) {
            return {...item.newMessage, content: newMessage.content}; // Thay đổi thuộc tính content thành giá trị mới
          }
          return item;
        }),
      );
    });
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // const res = await axios.get(
      //   `${url}/user/test-data`,
      // );
      const token = await AsyncStorage.getItem('token');
      const res = await getAllChat(token);

      setData(res.data.chat);
      setLoading(false);

      // const userStorage = await AsyncStorage.getItem('user');
      // const user = JSON.parse(userStorage);
      setAvatar(user.avatar);
      setMyUserName(user.userName);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
    socket.on('connection', () => {
      console.log('Connected to the Socket.IO server');
    });
    const dataJoin = {
      userNameJoin: user.userName,
    };

    socket.emit('join_new_message', dataJoin);
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ImageBackground
        source={images.background}
        style={{
          flex: 1,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: colors.bgHeader,
            height: 60,
          }}>
          <Image
            source={images.logo_vertical}
            style={{
              marginLeft: 10,
              width: 130,
              height: 40,
            }}></Image>
          <Image
            source={{uri: avatar}}
            style={{
              marginRight: 10,
              width: 40,
              height: 40,
              borderRadius: 100,
            }}></Image>
        </View>
        {loading ? (
          <Text>loading....</Text>
        ) : (
          <ScrollView>
            {data && data.length ? (
              <>
                {data.map(item => (
                  <UserChatItem
                    // key={item.objectChat._id}
                    setData={setData}
                    data={item}
                    myUserName={myUserName}
                    // newMessageIO={newMessageNotify.newMessage && (newMessageNotify.newMessage.chatId == item.objectChat._id) ? newMessageNotify.newMessage : ''}
                  />
                ))}
              </>
            ) : (
              <View
                style={{
                  width: 440,
                  opacity: 0.75,
                  height: 500,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={images.empty}
                  style={{
                    marginRight: 15,

                    width: 120,
                    height: 120,
                    borderRadius: 100,
                  }}></Image>
                <Text
                  style={{
                    color: colors.primary,
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>
                  No message chat
                </Text>
              </View>
            )}
          </ScrollView>
        )}
      </ImageBackground>
    </View>
  );
};

export default ChatItem;
