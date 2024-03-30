import react, {useState} from 'react';
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import {images, colors, fontSize} from '../../../constant';
import {Image} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import {faUserXmark} from '@fortawesome/free-solid-svg-icons/faUserXmark';
import {faCommentDots} from '@fortawesome/free-solid-svg-icons/faCommentDots';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons/faUserPlus';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addFriend, deleteFriend} from '../../../service/user';

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

// import { DemoBlock } from './demo'
function renderViewChatItem(prop) {
  const [message, setMessage] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [pressDeleteFriendUser, setPressDeleteFriendUser] = useState(false);
  const [modalVisibleDelete, setModalVisibleDelete] = useState(false);
  const [isFriendNow, setIsFriendNow] = useState(prop.isFriend);
  const pressAddFriend = async userNameAdd => {
    try {
      const token = await AsyncStorage.getItem('token');

      const items = await addFriend(token, userNameAdd);
      setMessage(items.data.message);
      setModalVisible(true);
      setIsFriendNow(1);
    } catch (error) {
      console.error(error);
    }
  };

  const pressDeleteFriend = async userNameDelete => {
    try {
      const token = await AsyncStorage.getItem('token');
      const items = await deleteFriend(token, userNameDelete);
      setMessage(items.data.message);
      setModalVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  let chatItem = (
    <View
      style={{
        width: 450,
        marginLeft: -20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {Array.isArray(message) ? (
              message.map(mes => <Text style={styles.modalText}>{mes}</Text>)
            ) : (
              <Text style={styles.modalText}>{message}</Text>
            )}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleDelete}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisibleDelete(!modalVisibleDelete);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to delete this friend?</Text>
            <View style={{ 
              display: 'flex',
              flexDirection: 'row',
             }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setIsFriendNow(0)
                  pressDeleteFriend(pressDeleteFriendUser);
                  setModalVisibleDelete(!modalVisibleDelete);
                }}>
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => {
                  setModalVisibleDelete(!modalVisibleDelete);
                }}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <View
        style={{
          marginTop: 140,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <Image
            source={{uri: prop.avatar}}
            style={{
              width: 130,
              height: 130,
              borderRadius: 100,
              zIndex: 1,
            }}></Image>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            width: 360,
            display: 'flex',
            justifyContent: 'flex',
            alignItems: 'center',
            height: 440,
            marginTop: -35,
            borderRadius: 30,
            position: 'relative',
          }}>
          <View
            style={{
              marginTop: 40,
            }}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: fontSize.h1,
              }}>
              {prop.firstName + ' ' + prop.lastName}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            {!isFriendNow ? (
              <TouchableOpacity
                onPress={() => pressAddFriend(prop.userName)}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  padding: 10,
                  borderRadius: 20,
                  backgroundColor: colors.colorBgButton,
                  marginRight: 20,
                  marginBottom: 50,
                }}>
                <FontAwesomeIcon
                  style={{marginRight: 7}}
                  color="white"
                  icon={faUserPlus}
                />
                <Text style={{fontWeight: 'bold', color: 'white'}}>
                  Add friend
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setModalVisibleDelete(true) 
                  setPressDeleteFriendUser(prop.userName)
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  padding: 10,
                  borderRadius: 20,
                  backgroundColor: colors.colorBgButton,
                  marginRight: 20,
                  marginBottom: 50,
                }}>
                <FontAwesomeIcon
                  style={{marginRight: 7}}
                  color="white"
                  icon={faUserXmark}
                />
                <Text style={{fontWeight: 'bold', color: 'white'}}>
                  Delete friend
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                padding: 10,
                borderRadius: 20,
                backgroundColor: colors.colorBgButton,
                marginBottom: 50,
              }}>
              <FontAwesomeIcon
                style={{marginRight: 7}}
                color="white"
                icon={faCommentDots}
              />
              <Text style={{fontWeight: 'bold', color: 'white'}}>Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  //   let chatItems = [];
  //   for (let i = 0; i < 12; i++) {
  //     chatItems.push(chatItem);
  //   }
  return <>{chatItem}</>;
}
this.state = {
  value: '',
  clicked: 'none',
  text: '',
};

function RenderProfile(res) {
  const navigation = useNavigation();
  const {route} = res;
  const data = route.params.data;
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
              flex: 1,
              position: 'relative',
              width: 412,
              height: 200,
            }}>
            <Image
              source={{uri: data.background}}
              style={{
                width: 420,
                height: 250,
                position: 'absolute',
                top: 0,
                left: 0,
              }}></Image>
            <View>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesomeIcon
                  style={{marginTop: 15, marginLeft: 10}}
                  color={colors.primary}
                  size={20}
                  icon={faChevronLeft}
                />
              </TouchableOpacity>
            </View>
            <ScrollView>{renderViewChatItem(data)}</ScrollView>
          </View>
        </ImageBackground>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    paddingBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 15,
    marginHorizontal: 5,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: colors.colorHide,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    borderColor: 'black',
    border: '1px solid',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: colors.textButton,
    textAlign: 'center',
  },
});

export default RenderProfile;
