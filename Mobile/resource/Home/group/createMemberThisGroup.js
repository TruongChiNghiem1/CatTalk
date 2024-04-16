import react, {useState, useEffect} from 'react';
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
import {Button, Icon, WhiteSpace, WingBlank} from '@ant-design/react-native';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons/faArrowRight';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {url} from '../../../service/cattalk';
import ViewFriendItem from './viewFriendItem';
import {getFriendAddGroup} from '../../../service/user';
import {createNewMemberGroup} from '../../../service/chat';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import {
  Checkbox,
  Flex,
  List,
} from '@ant-design/react-native'

// import { DemoBlock } from './demo'
function CreateMemberThisGroup(res) {
  var {dataCreate} = res.route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [nameGroup, setNameGroup] = useState('');
  const [selectUserGroup, setSelectUserGroup] = useState([]);
  const [data, setData] = useState([]);
  const CheckboxItem = Checkbox.CheckboxItem
  const [message, setMessage] = useState([]);
  const [token, setToken] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const chatId = dataCreate.objectChat._id;
  // const [user, setUser] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const tokenGet = await AsyncStorage.getItem('token');
      
      const items = await getFriendAddGroup(tokenGet, search, chatId);
      setData(items.data.data);
      setToken(tokenGet);
      // const userStorage = await AsyncStorage.getItem('user');
      // setUser(JSON.parse(userStorage));

      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const createThisGroupButton = async() => {
    try {
      var dataAddGroup = {
        chatId: chatId,
        userNameAdd : selectUserGroup
      }
      console.log(dataAddGroup);
      const createGroup = await createNewMemberGroup(token, dataAddGroup);
      console.log(createGroup);
      setMessage(createGroup.data.message);
      setModalVisible(true)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
      fetchData();
  }, []);

  const searchFriend = () => {};

  return (
    <View
      style={{
        flex: 1,
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
                setModalVisible(!modalVisible)
                }}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

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
            height: 53,
          }}>
            <View style={{
            display: 'flex',
            flexDirection: 'row',
            // justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: colors.bgHeader,
            height: 53,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              style={{marginTop: 3, marginLeft: 13}}
              color={colors.primary}
              size={20}
              icon={faChevronLeft}
            />
          </TouchableOpacity>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: 'bold',
                marginTop: 3,
                marginLeft: 13,
              }}>
              Add members
            </Text>
          </View>
          </View>
          <TouchableOpacity onPress={createThisGroupButton} title="Login" style={{ justifyContent: 'flex-end', textAlign: 'right', marginRight: 10, marginBottom: 5, }}>
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
              <FontAwesomeIcon
                icon={faArrowRight}
                color={colors.colorBgButton}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <UIInput
            placeholder="Nhập username hoặc email"
            width={340}
            height={10}
            onChangeText={setSearch}></UIInput>
          <TouchableOpacity onPress={fetchData} title="Login">
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
              backgroundColor: colors.colorHide ,
            }}>
              
                {/* <CheckboxItem
                  checked={this.state.checkboxItem1}
                  onChange={(event) => {
                    // this.setState({ checkboxItem1: event.target.checked })
                  }}>
                  Option 1
                </CheckboxItem> */}
                {/* <CheckboxItem>Option 2</CheckboxItem> */}
              
            {data && data.length ? (
              <>
                <List renderHeader="Chọn thành viên">
                  {data.map(item => (
                    item.inThisGroup ? 
                    <CheckboxItem style={{ height: 80, }}
                      checked
                      disabled
                      >
                      <ViewFriendItem data={item} />
                    </CheckboxItem> 
                    :
                    <CheckboxItem style={{ height: 80, }}
                    onChange={(event) => {
                      // this.setState({ checkboxItem1: event.target.checked })
                      event.target.checked ?
                      setSelectUserGroup([...selectUserGroup, item.userName]) :
                      setSelectUserGroup(selectUserGroup.filter(usr =>  usr !== item.userName))
                    }}
                    >
                    <ViewFriendItem data={item} />
                  </CheckboxItem>
                  ))}
                </List>
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
      </ImageBackground>
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

export default CreateMemberThisGroup;
