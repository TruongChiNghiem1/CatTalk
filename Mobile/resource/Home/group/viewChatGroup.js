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
import RenderMyViewChatItem from '../chat/myViewChatItem';
import RenderSystemViewChatItem from '../chat/systemViewChatItem';
import RenderViewChatGroupItem from '../chat/userViewChatItem';
import {socket} from '../../../service/cattalk';
import {io} from 'socket.io-client';
import axios from 'axios';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons/faUserPlus';
// import * as ImagePicker from "expo-image-picker"
import {launchImageLibrary} from 'react-native-image-picker';

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

function RenderViewChatGroup(res) {
  console.log('Chat group');
  const navigation = useNavigation();
  var {dataChat, myUserNameOne} = res.route.params;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [myUserName, setMyUserName] = useState(myUserNameOne);
  const [userNameChat, setUserNameChat] = useState('');
  const [newMessageSend, setNewMessageSend] = useState('');
  const [nameUserChat, setNameUserChat] = useState('');
  const [chatId, setChatId] = useState(dataChat.objectChat._id);
  const [allChatMessage, setAllChatMessage] = useState('');
  const scrollViewRef = useRef();
  const [selectedImage, setSelectedImage] = useState('');
  const [typeMessage, setTypeMessage] = useState(1);

  const [avatar, setAvatar] = useState(
    'https://static.vecteezy.com/system/resources/previews/024/766/958/original/default-male-avatar-profile-icon-social-media-user-free-vector.jpg',
  );
  //Socket
  const route = useRoute();

  const [socket, setSocket] = useState(io.connect('http://192.168.1.24:2090'));

  const onSubmitNewSendMessage = async () => {
    socket.emit('message', {
      chatId: chatId,
      senderId: myUserName,
      newMessageSend: newMessageSend,
      typeMessage: typeMessage,
    });
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

      setUserNameChat(dataChat.objectChat.userName);
      setAvatar(dataChat.objectChat.avatar);
      setNameUserChat(dataChat.objectChat.groupName);
      setChatId(dataChat.objectChat._id);

      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(
        'http://192.168.1.24:2080/messages-group',
        {
          senderId: user.userName,
          chatId: dataChat.objectChat._id,
        },
        {
          headers: {authorization: `Bearer ${token}`},
        },
      );
      setData(response.data.messages);
      setTimeout(() => {
        scrollToBottom();
      }, 200);
    } catch (error) {
      console.log('Error fetching the messages', error);
    }
  };

  useEffect(() => {
    socket.on('connection', () => {
      console.log('Connected to the Socket.IO server');
    });
    const dataJoin = {
      chatIdJoin: chatId,
      userNameJoin: myUserNameOne,
    };
    socket.emit('join_room', dataJoin);
  }, []);

  useEffect(() => {
    socket.on('receiveMessage', newMessage => {
      console.log('new Message', newMessage);
      //update the state to include new message
      setData(prevMessages => [...prevMessages, newMessage]);
      setTimeout(() => {
        scrollToBottom();
      }, 200);
    });
  }, []);

  useEffect(() => {
    fetchMessages();
  }, []);

  // const chooseImage = async () => {
  // let result = await ImagePicker.launchImageLibraryAsync({
  //   allowsEditing: true,
  //   quality: 1
  // })

  // console.log('chon anh ', result);
  // if(!result.canceled){
  //   //set
  // } else {
  //   console.log('no choose image');
  // }
  // }

  const chooseImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let base64String = response.assets;
        // let base64String = response.uri || response.assets?.[0]?.uri;
        // const base64String = imageToBase64(imageUri);
        socket.emit('messageImage', base64String, {
          chatId: chatId,
          senderId: myUserName,
          newMessageSend: base64String,
        });
        // call the fetchMessages() function to see the UI update
        // setTimeout(() => {
        //   fetchMessages();
        // }, 1000);
      }
    });
  };

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
                onPress={() =>
                  navigation.navigate('RenderMoreChatGroup', {data: dataChat})
                }>
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
                    socket={socket}
                    chatId={chatId}
                    myUserName={myUserName}
                    setData={setData}
                  />
                ) : (
                  <RenderViewChatGroupItem
                    key={`view_${messageItem._id}_${index}`}
                    data={messageItem}
                    profileUser={dataChat.member.filter(
                      mem => mem.userName === messageItem.createdBy,
                    )}
                    typeChat={'multi'}
                    chatId={chatId}
                    myUserName={myUserName}
                    setData={setData}
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
              <TouchableOpacity onPress={chooseImage}>
                <FontAwesomeIcon
                  style={{marginRight: 15}}
                  color={colors.primary}
                  size={20}
                  icon={faImage}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onSubmitNewSendMessage()}
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

export default RenderViewChatGroup;
