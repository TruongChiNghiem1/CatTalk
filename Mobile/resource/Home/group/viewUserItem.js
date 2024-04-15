import react, { useState, useEffect } from 'react';
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {images, colors, fontSize} from '../../../constant';
import {Image, Alert, Modal, StyleSheet, Pressable} from 'react-native';
import {UIInput} from '../../../components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {height} from '@fortawesome/free-solid-svg-icons/faMugSaucer';
import {AppRegistry} from 'react-native';
import {Button, Icon, WhiteSpace, WingBlank} from '@ant-design/react-native';
import {faVideo} from '@fortawesome/free-solid-svg-icons/faVideo';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons/faUserPlus';
import { addFriend, getOneUser } from '../../../service/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {DrawerActions, useNavigation} from '@react-navigation/native';


function ViewUserItem(props) {
  const navigation = useNavigation();
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const {data} = props;
  const [isFriendNow, setIsFriendNow] = useState(1)
  // const [friend, setfriend] = useState();
  const avatar = data.avatar ?? 'https://static.vecteezy.com/system/resources/previews/024/766/958/original/default-male-avatar-profile-icon-social-media-user-free-vector.jpg';

  const getData = async () => {
    setLoading(true);
    try {
        setLoading(false);
    } catch (e) {
        console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const pressAddFriend = async (userNameAdd) => {
    try {
      const token = await AsyncStorage.getItem('token');
      
      const items = await addFriend(token, userNameAdd);
      setMessage(items.data.message);
      setModalVisible(true)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('RenderProfile', {data: data })}
      style={{
        margin: 15,
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
            { Array.isArray(message) ?
                message.map(mes => <Text style={styles.modalText}>{mes}</Text>) :
                <Text style={styles.modalText}>{message}</Text>
            }
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setIsFriendNow(1)
                setModalVisible(!modalVisible)
                }}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
          source={{uri: avatar}}
          style={{
            marginRight: 15,
            width: 50,
            height: 50,
            borderRadius: 100,
          }}></Image>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: fontSize.h3,
            }}>
            {data.firstName + ' ' + data.lastName}
          </Text>
        </View>
        <View 
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: 50,
          }}>
            {!isFriendNow ?
              <TouchableOpacity 
                onPress={() => pressAddFriend(data.userName)}
              >
                  <View
                      style={{
                          backgroundColor: 'white',
                          width: 37,
                          marginTop: 7,
                          height: 37,
                          borderRadius: 100,
                          marginLeft: 8,
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                      }}>
                      <FontAwesomeIcon icon={faUserPlus} color={colors.colorBgButton} />
                  </View>
              </TouchableOpacity>
              :
              <></>
            }
        </View>
      </View>
    </TouchableOpacity>
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
    padding: 10,
    marginTop: 15,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 10,
    color: colors.textButton,
    textAlign: 'center',
  },
});

export default ViewUserItem