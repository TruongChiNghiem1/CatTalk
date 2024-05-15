import react, {useState, useEffect} from 'react';
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Provider, Modal, Button} from '@ant-design/react-native';
import {images, colors, fontSize} from '../../../constant';
import {Image} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {editProfile, uploadAvatarMobile, getUser} from '../../../service/user';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {faCamera} from '@fortawesome/free-solid-svg-icons/faCamera';
import {faImages} from '@fortawesome/free-solid-svg-icons/faImages';

// import { DemoBlock } from './demo'
function renderViewChatItem(token, prop) {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [birthday, setbirthday] = useState('');
  const [gender, setgender] = useState('');
  const [hometown, sethometown] = useState('');
  const [avatar, setAvatar] = useState('');
  const [visible2, setVisible2] = useState(false);

  const onSubmitHandler = async () => {
    try {
      let values = {
        token,
        firstName,
        lastName,
        birthday,
        gender,
        hometown,
      };
      const res = await editProfile(values);

      if (res.data.status !== 200) {
        setMessage(res.data.message);
      } else {
        setMessage(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const chooseImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options,async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let newAvatar = response.assets;
        const res = await uploadAvatarMobile(newAvatar, token);
        setAvatar(res.data.avatar);
      }
    });
  };

  const takePhoto = async () => {
    try {
      const { assets } = await launchCamera({
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 2000,
        maxWidth: 2000,
      });
  
      if (assets && assets.length > 0) {
        let newAvatar = assets;
        const res = await uploadAvatarMobile(newAvatar, token);
        setAvatar(res.data.avatar);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };
  

  const onClose2 = () => {
    setVisible2(false);
  };

  useEffect(() => {
    setAvatar(prop.avatar)
  }, [prop.avatar]);

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
          <TouchableOpacity
            style={{
              width: 130,
              height: 130,
              borderRadius: 100,
              zIndex: 1,
            }}
            onPress={() => setVisible2(true)}>
            <Image
              style={{
                width: 130,
                height: 130,
                borderRadius: 100,
                zIndex: 1,
              }}
              source={{uri: avatar}}></Image>
          </TouchableOpacity>
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
      <Modal
        popup
        visible={visible2}
        animationType="slide-up"
        onClose={onClose2}>
        <View
          style={{
            paddingTop: 15,
            paddingBottom: 5,
            paddingHorizontal: 20,
            height: 120,
          }}>
          <TouchableOpacity
            style={{
              height: 45,
              flexDirection: 'row',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              marginBottom: 5,
            }}
            onPress={takePhoto}>
            <FontAwesomeIcon
              style={{paddingRight: 40}}
              color={colors.primary}
              size={20}
              icon={faCamera}
            />
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                fontSize: fontSize.h4,
              }}>
              Take a new photo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 45,
              flexDirection: 'row',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
            onPress={chooseImage}>
            <FontAwesomeIcon
              style={{paddingRight: 40}}
              color={colors.primary}
              size={20}
              icon={faImages}
            />
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                fontSize: fontSize.h4,
              }}>
              Choose from your device
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          type="primary"
          style={{
            backgroundColor: colors.colorBgButton,
            borderColor: colors.colorBgButton,
          }}
          onPress={onClose2}>
          Cancel
        </Button>
      </Modal>
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
  const [token, settoken] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const userAsyncStorage = await AsyncStorage.getItem('user');
      var getToken = await AsyncStorage.getItem('token');
      settoken(getToken)
      const myUserName = JSON.parse(userAsyncStorage).userName

      const user = await getUser(token, myUserName);
      AsyncStorage.setItem('user', JSON.stringify(user.data.user));
      setData(user.data.user);

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
            <ScrollView>{renderViewChatItem(token,data)}</ScrollView>
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
