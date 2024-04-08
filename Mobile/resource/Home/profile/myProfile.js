import react, {useState, useEffect} from 'react';
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
import {faCommentDots} from '@fortawesome/free-solid-svg-icons/faCommentDots';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons/faUserPlus';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {getOneUser} from '../../../service/user';
import {UIInput} from '../../../components';
import {editProfile} from '../../../service/user';


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
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [birthday, setbirthday] = useState('');
  const [gender, setgender] = useState('');
  const [hometown, sethometown] = useState('');
  
  // setAvatar(prop.avatar)
  const onSubmitHandler = async() => {
    try {
      const token = await AsyncStorage.getItem('token');
      let values = {
        token,
        firstName,
        lastName,
        birthday,
        gender,
        hometown
      }
      const res = await editProfile(values)

      if (res.data.status !== 200) {
        setMessage(res.data.message);
        setModalVisible(true)
      } else {
        setMessage(res.data.message);
      }
    } catch (error) {
      setModalVisible(true)
      console.log(error);
    }
  }

  let chatItem = (
    <View
      style={{
        width: 450,
        marginLeft: -20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
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
              flexDirection: 'column',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Text
              style={{
                color: 'black',
              }}>
              Description: {prop.description}
            </Text>
            
            <Text
              style={{
                color: 'black',
                marginTop: 30,
              }}>
              First name: {prop.firstName}
            </Text>
            <Text
              style={{
                color: 'black',
                marginTop: 10,
              }}>
              Last name: {prop.lastName}
            </Text>
            <Text
              style={{
                color: 'black',
                marginTop: 10,
              }}>
              Email: {prop.email}
            </Text>
            <Text
              style={{
                color: 'black',
                marginTop: 10,
              }}>
              Birth Day: {moment(prop.birthday).format('DD/MM/YYYY')}
            </Text>
            <Text
              style={{
                color: 'black',
                marginTop: 10,
              }}>
              Home town: {prop.hometown}
            </Text>
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

function RenderMyProfile(res) {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [background, setBackground] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const user = await AsyncStorage.getItem('user');
      setData(JSON.parse(user));

      setBackground(data.background);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
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

export default RenderMyProfile;
