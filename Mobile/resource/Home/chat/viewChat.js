import react, { useEffect, useState, useRef } from 'react';
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { images, colors, fontSize } from '../../../constant';
import { Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faVideo } from '@fortawesome/free-solid-svg-icons/faVideo';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons/faEllipsisVertical';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons/faPaperclip';
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons/faFaceSmile';
import { faImage } from '@fortawesome/free-solid-svg-icons/faImage';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { height } from '@fortawesome/free-solid-svg-icons/faMugSaucer';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RenderMyViewChatItem from './myViewChatItem';
import RenderSystemViewChatItem from './systemViewChatItem';
import RenderViewChatItem from './userViewChatItem';
import { socket } from '../../../service/cattalk';
import { io } from 'socket.io-client';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import { UIInput } from '../../../components';
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
  Modal,
  Checkbox,
} from '@ant-design/react-native';
import ViewFriendItem from './viewFriendItem';
import { getFriends } from '../../../service/user';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';

this.state = {
  value: '',
  clicked: 'none',
  text: '',
};

const showActionSheet = () => {
  const BUTTONS = [
    <View style={{ width: 400 }}>
      <List.Item extra={<Switch />}>Mute message</List.Item>
    </View>,
    <Toch style={{}}>
      <View
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesomeIcon
          style={{ color: 'red', marginRight: 8 }}
          icon={faTrashCan}
        />
        <Text style={{ color: 'red', fontSize: fontSize.h3 }}>Delete chat </Text>
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
  var { dataChat, myUserNameOne } = res.route.params;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataFriend, setDataFriend] = useState([]);
  const [myUserName, setMyUserName] = useState('');
  const [userNameChat, setUserNameChat] = useState('');
  const [newMessageSend, setNewMessageSend] = useState('');
  const [nameUserChat, setNameUserChat] = useState('');
  const [chatId, setChatId] = useState(dataChat.objectChat._id);
  const [allChatMessage, setAllChatMessage] = useState('');
  const [isLongPressParent, setIsLongPressParent] = useState(false);
  const [isOpenModalForwardMessage, setIsOpenModalForwardMessage] =
    useState(false);
  const scrollViewRef = useRef();
  const [search, setSearch] = useState('');
  const [avatar, setAvatar] = useState(
    'https://static.vecteezy.com/system/resources/previews/024/766/958/original/default-male-avatar-profile-icon-social-media-user-free-vector.jpg',
  );
  const [selectUserGroup, setSelectUserGroup] = useState([]);
  const CheckboxItem = Checkbox.CheckboxItem;
  //Socket
  const route = useRoute();
  const [token, settoken] = useState('');
  const [socket, setSocket] = useState(io.connect('http://192.168.1.24:2090'));

  const onSubmitNewSendMessage = async (senderId, receiverId) => {
    socket.emit('message', { chatId, senderId, receiverId, newMessageSend });
    setNewMessageSend('');
    // call the fetchMessages() function to see the UI update
    setTimeout(() => {
      fetchMessages();
    }, 200);
  };

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
        socket.emit('messageImage', base64String, {
          chatId: chatId,
          senderId: myUserName,
          newMessageSend: base64String,
        });
      }
    });
  };

  const scrollToBottom = async () => {
    await scrollViewRef.current.scrollToEnd({ animated: true });
  };

  const backDisconnect = async () => {
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'BasicTabBarExample' }],
    // });
    navigation.navigate('BasicTabBarExample',{navigation: 'blueTab'});
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
      var getToken = await AsyncStorage.getItem('token');
      settoken(getToken);
      const response = await axios.post(
        'http://192.168.1.24:2080/messages-group',
        {
          senderId: user.userName,
          chatId: dataChat.objectChat._id,
        },
        {
          headers: { authorization: `Bearer ${token}` },
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

    socket.on('receive-recall-message', messageDelete => {
      setData(prevData =>
        prevData.filter(item => item._id !== messageDelete._id),
      );
    });
  }, []);

  const onCloseModalForwardMessage = () => {
    setIsOpenModalForwardMessage(false);
  };

  const onOpenModalForwardMessage = async () => {
    getDataFriend();
    setIsOpenModalForwardMessage(true);
  };

  const getDataFriend = async () => {
    const items = await getFriends(token, search);
    setDataFriend(items.data.data);
  };

  const createThisGroupButton = async () => {
    try {
      var dataAddGroup = {
        nameGroup: nameGroup,
        userNameAdd: selectUserGroup,
      };
      const createGroup = await createThisGroup(token, dataAddGroup);
      setMessage(createGroup.data.message);
      setModalVisible(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      onPress={() => setIsLongPressParent(false)}
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
                  style={{ marginRight: 10 }}
                  color={colors.primary}
                  size={20}
                  icon={faChevronLeft}
                />
              </TouchableOpacity>
              <Image
                source={{ uri: avatar }}
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
                  style={{ marginHorizontal: 10 }}
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
                    onOpenModalForwardMessage={onOpenModalForwardMessage}
                  />
                ) : (
                  <RenderViewChatItem
                    key={`view_${messageItem._id}_${index}`}
                    data={messageItem}
                    profileUser={dataChat.member.filter(
                      mem => mem.userName === messageItem.createdBy,
                    )}
                    typeChat={'single'}
                    chatId={chatId}
                    myUserName={myUserName}
                    setData={setData}
                  />
                ),
              )
            ) : (
              <Text>Loading...</Text>
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
                style={{ marginLeft: 15, marginRight: 5 }}
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
                style={{ marginRight: 5 }}
                color={colors.primary}
                size={20}
                icon={faFaceSmile}
              />
              <TouchableOpacity onPress={chooseImage}>
                <FontAwesomeIcon
                  style={{ marginRight: 15 }}
                  color={colors.primary}
                  size={20}
                  icon={faImage}
                />
              </TouchableOpacity>
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
        <Modal
          popup
          visible={isOpenModalForwardMessage}
          animationType="slide-up"
          onClose={onCloseModalForwardMessage}>
          <View
            style={{
              paddingTop: 15,
              paddingBottom: 5,
              paddingHorizontal: 20,
              height: 720,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
              <UIInput
                placeholder="Nhập username hoặc email"
                width={320}
                height={10}
                onChangeText={setSearch}></UIInput>
              <TouchableOpacity onPress={getDataFriend} title="Login">
                <View
                  style={{
                    backgroundColor: 'white',
                    width: 41,
                    marginTop: 7,
                    height: 41,
                    borderRadius: 100,
                    marginLeft: 8,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    color={colors.colorBgButton}
                  />
                </View>
              </TouchableOpacity>
            </View>
            {loading ? (
              <Text>loading....</Text>
            ) : (
              <ScrollView
                style={{
                  marginVertical: 15,
                  backgroundColor: colors.colorHide,
                }}>
                {dataFriend && dataFriend.length ? (
                  <>
                    {dataFriend.map(item => (
                      <View style={{ height: 80 }}>
                        <ViewFriendItem data={item} />
                      </View>
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
                      No user found
                    </Text>
                  </View>
                )}
              </ScrollView>
            )}
          </View>
          <Button
            type="primary"
            style={{
              width: 400,
              backgroundColor: colors.colorBgButton,
              borderColor: colors.colorBgButton,
            }}
            onPress={onCloseModalForwardMessage}>
            Cancel
          </Button>
        </Modal>
      </Provider>
    </View>
  );
}

export default RenderViewChat;
