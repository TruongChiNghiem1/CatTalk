import react, {useEffect, useState, useRef} from 'react';
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {images, colors, fontSize} from '../../../constant';
import {Image} from 'react-native';
import {UIInput} from '../../../components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import {faVideo} from '@fortawesome/free-solid-svg-icons/faVideo';
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons/faEllipsisVertical';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons/faPaperclip';
import {faFaceSmile} from '@fortawesome/free-solid-svg-icons/faFaceSmile';
import {faImage} from '@fortawesome/free-solid-svg-icons/faImage';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons/faTrashCan';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import {height} from '@fortawesome/free-solid-svg-icons/faMugSaucer';
import {AppRegistry} from 'react-native';
import BasicTabBarExample from '../layout/footer';
import {useRoute, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getMessage} from '../../../service/chat';
import RenderMyViewChatItem from './myViewChatItem';
import RenderSystemViewChatItem from './systemViewChatItem';
import RenderViewChatItem from './userViewChatItem';
import {socket} from '../../../service/cattalk';
import {io} from 'socket.io-client';
import axios from 'axios';

import {
  Button,
  Icon,
  WhiteSpace,
  WingBlank,
  InputItem,
  TextareaItem,
  Provider,
  ActionSheet,
  List,
  Switch,
} from '@ant-design/react-native';

this.state = {
  value: '',
  clicked: 'none',
  text: '',
};

const showActionSheet = () => {
  const BUTTONS = [
    <View style={{width: 400}}>
      <List.Item extra={<Switch />}>Mute message</List.Item>
    </View>,
    <Toch style={{}}>
      <View
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <FontAwesomeIcon
          style={{color: 'red', marginRight: 8}}
          icon={faTrashCan}
        />
        <Text style={{color: 'red', fontSize: fontSize.h3}}>Delete chat </Text>
      </View>
    </Toch>,
  ];
  ActionSheet.showActionSheetWithOptions(
    {
      title: 'Option',
      message: 'Description',
      options: BUTTONS,
      cancelButtonIndex: 3,
      // destructiveButtonIndex: 3,
    },
    // (buttonIndex: any) => {
    // this.setState({clicked: BUTTONS[buttonIndex]});
    // },
  );
};

function RenderViewChat(res) {
  console.log('chat don');
  const navigation = useNavigation();
  var {dataChat, myUserNameOne} = res.route.params;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [myUserName, setMyUserName] = useState('');
  const [userNameChat, setUserNameChat] = useState('');
  const [newMessageSend, setNewMessageSend] = useState('');
  const [nameUserChat, setNameUserChat] = useState('');
  const [chatId, setChatId] = useState(dataChat.objectChat._id);
  const [allChatMessage, setAllChatMessage] = useState('');
  const scrollViewRef = useRef();
  const [avatar, setAvatar] = useState(
    'https://static.vecteezy.com/system/resources/previews/024/766/958/original/default-male-avatar-profile-icon-social-media-user-free-vector.jpg',
  );
  //Socket
  const route = useRoute();

  const [socket, setSocket] = useState(io.connect('http://172.28.107.55:2090'));

  const onSubmitNewSendMessage = async (senderId, receiverId) => {
    socket.emit('message', {chatId, senderId, receiverId, newMessageSend});
    setNewMessageSend('');
    // call the fetchMessages() function to see the UI update
    setTimeout(() => {
      fetchMessages();
    }, 200);
  };

  const scrollToBottom = async () => {
    await scrollViewRef.current.scrollToEnd({animated: true});
  };

  const backDisconnect = async () => {
    navigation.navigate('BasicTabBarExample');
  };

  const fetchMessages = async () => {
    try {
      // const senderId = route?.params?.senderId;
      // const receiverId = route?.params?.receiverId;

      const userStorage = await AsyncStorage.getItem('user');
      const user = JSON.parse(userStorage);
      setMyUserName(user.userName);

      setUserNameChat(dataChat.member[0].userName);
      setAvatar(dataChat.member[0].avatar);
      setNameUserChat(
        dataChat.member[0].firstName + ' ' + dataChat.member[0].lastName,
      );
      setChatId(dataChat.objectChat._id);
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(
        'http://172.28.107.55:2080/messages-group',
        {
          senderId: user.userName,
          chatId: dataChat.objectChat._id,
        },
        {
          headers: {authorization: `Bearer ${token}`},
        },
      );
      console.log('aaaaaaaaaaaaa');

      console.log(response.data.messages);
      setData(response.data.messages);
      setTimeout(() => {
        scrollToBottom();
      }, 200);
    } catch (error) {
      console.log('Error fetching the messages', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    socket.on('connection', () => {
      console.log('Connected to the Socket.IO server');
    });
    const dataJoin = {
      chatIdJoin: chatId,
      userNameJoin: myUserNameOne,
    };
    console.log(dataJoin);
    socket.emit('join_room', dataJoin);
  }, []);

  useEffect(() => {
    socket.on('receiveMessage', newMessage => {
      console.log('new Message', newMessage);
      setData(prevMessages => [...prevMessages, newMessage]);
      setTimeout(() => {
        scrollToBottom();
      }, 200);
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Provider>
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
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 10,
              }}>
              <TouchableOpacity onPress={backDisconnect}>
                <FontAwesomeIcon
                  style={{marginRight: 10}}
                  color={colors.primary}
                  size={20}
                  icon={faChevronLeft}
                />
              </TouchableOpacity>
              <Image
                source={{uri: avatar}}
                style={{
                  marginRight: 10,
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                }}></Image>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: fontSize.h3,
                }}>
                {nameUserChat}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 10,
              }}>
              <FontAwesomeIcon
                style={{}}
                size={23}
                color={colors.primary}
                icon={faVideo}
              />
              <Button
                style={{
                  backgroundColor: colors.bgHeader,
                  borderColor: colors.bgHeader,
                  marginHorizontal: 5,
                  width: 15,
                  height: 23,
                }}
                onPress={showActionSheet}>
                <FontAwesomeIcon
                  style={{marginHorizontal: 10}}
                  color={colors.primary}
                  size={20}
                  icon={faEllipsisVertical}
                />
              </Button>
            </View>
          </View>
          <ScrollView ref={scrollViewRef}>
            {data ? (
              data.map((messageItem, index) =>
                messageItem.typeMessage == 0 ? (
                  <RenderSystemViewChatItem
                    key={`system_${messageItem._id}_${index}`}
                    data={messageItem}
                  />
                ) : messageItem.createdBy === myUserName ? (
                  <RenderMyViewChatItem
                    key={`my_${messageItem._id}_${index}`}
                    data={messageItem}
                  />
                ) : (
                  <RenderViewChatItem
                    key={`view_${messageItem._id}_${index}`}
                    data={messageItem}
                    profileUser={dataChat.member.filter(
                      mem => mem.userName === messageItem.createdBy,
                    )}
                    typeChat={'single'}
                  />
                ),
              )
            ) : (
              <></>
            )}
          </ScrollView>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 5,
            }}>
            <View
              style={{
                backgroundColor: colors.colorFooterMenu,
                borderRadius: 20,
                width: 400,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <FontAwesomeIcon
                color={colors.primary}
                style={{marginLeft: 15, marginRight: 5}}
                size={20}
                icon={faPaperclip}
              />
              {/* <InputItem
              // clear
              // error
              // value={this.state.value}
              // onChange={(value: any) => {
              // this.setState({
              //     value,
              // });
              // }}
              style={{color: 'black'}}
              placeholderTextColor={'#959595'}
              // extra="Sticker"
              placeholder="Tin nhắn">
            </InputItem> */}
              <TextareaItem
                onChangeText={setNewMessageSend}
                value={newMessageSend}
                rows={1}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'black',
                  width: 230,
                  backgroundColor: colors.colorFooterMenu,
                }}
                placeholderTextColor={'#959595'}
                placeholder="Tin nhắn"
              />
              <FontAwesomeIcon
                style={{marginRight: 5}}
                color={colors.primary}
                size={20}
                icon={faFaceSmile}
              />
              <FontAwesomeIcon
                style={{marginRight: 15}}
                color={colors.primary}
                size={20}
                icon={faImage}
              />
              <TouchableOpacity
                onPress={() => onSubmitNewSendMessage(myUserName, userNameChat)}
                style={{
                  width: 30,
                  height: 30,
                  marginRight: 10,
                  borderRadius: 100,
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                  textAlign: 'center',
                }}
                title="Login">
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  color={colors.primary}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </Provider>
    </View>
  );
}

export default RenderViewChat;
