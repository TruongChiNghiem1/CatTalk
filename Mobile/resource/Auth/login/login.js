import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  View,
  TextInput,
  Linking,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import {NoticeBar, WhiteSpace} from '@ant-design/react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {images, fontSize, colors} from '../../../constant';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowRightToBracket} from '@fortawesome/free-solid-svg-icons/faArrowRightToBracket';
import {SvgUri} from 'react-native-svg';
import {UIInput} from '../../../components';
import {url} from '../../../service/cattalk';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = res => {
  const navigation = useNavigation();
  const [userName, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const onSubmitHandler = async () => {
    try {
      const res = await axios.post(`${url}/user/login`, {userName, password});
      console.log([res.data.status], res.data.message);
      if (res.data.status !== 200) {
        setIsError(true);
        setMessage(res.data.message);
        setModalVisible(true);
      } else {
        AsyncStorage.setItem('token', JSON.stringify(res.data.accessToken));
        AsyncStorage.setItem('user', JSON.stringify(res.data.user));
        AsyncStorage.setItem('isLogin', JSON.stringify(true));

        setMessage(res.data.message);
        navigation.navigate('Home');
      }
    } catch (error) {
      setModalVisible(true);
      console.log(error);
    }
  };


  return (
    <View
      style={{
        // backgroundColor: '#83FBFF',
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
            {Array.isArray(message) ? (
              message.map(mes => <Text style={styles.modalText}>{mes}</Text>)
            ) : (
              <Text style={styles.modalText}>{message}</Text>
            )}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <ImageBackground
        source={images.background}
        resizeMode="cover"
        style={{
          flex: 1,
        }}>
        <View
          style={{
            marginTop: 150,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={images.logo}
            style={{
              width: 200,
              height: 200,
            }}></Image>
          <UIInput placeholder="Username" onChangeText={setEmail}></UIInput>
          <UIInput
            placeholder="Password"
            isPassword={true}
            onChangeText={setPassword}></UIInput>
          <View style={{width: 300, display: 'flex', alignItems: 'flex-end'}}>
            <Text
              onPress={() => Linking.openURL('')}
              style={{
                width: 95,
                fontSize: fontSize.h5,
                marginBottom: 20,
                color: 'black',
              }}>
              Forgot password
            </Text>
          </View>
          {/* // onPress={handleLogIn} */}
          <TouchableOpacity
            onPress={onSubmitHandler}
            style={{
              width: 65,
              height: 65,
              backgroundColor: colors.bgInput,
              borderRadius: 100,
            }}
            title="Login">
            <View
              style={{
                width: 63,
                height: 65,
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                }}>
                <FontAwesomeIcon
                  style={{
                    color: colors.textButton,
                  }}
                  icon={faArrowRightToBracket}
                  size={22}
                />
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 30,
              display: 'flex',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: fontSize.h5,
                color: 'black',
              }}>
              You don't have account ?{' '}
            </Text>
            <Text
              onPress={() => navigation.navigate('SignUpEmail')}
              style={{
                color: colors.primary,
                fontSize: fontSize.h5,
                fontWeight: 'bold',
              }}>
              Sign up
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

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
    color: 'red',
    textAlign: 'center',
  },
});

export default Login;
/*
import {sum2Number, subtract2Number} from '../utilies/caculator'
const mainScreen = (props) => {
    // alert(`x = ${props.x} y = ${props.y}`)
    // return <Text>Main screen nghiem x = {props.x} y = {props.y}</Text>

    //Destructer
    const {x, y} = props
    const {person} = props
    const {name, age, email} = person
    const {products} = props

    return (
        <View>
            <Text>Main screen nghiem x = {x} y = {y}</Text>
            <Text>
                Tên: {name},
                Tuổi: {age},
                Email: {email}
            </Text>
            //{ <Text>{JSON.stringify(products)}</Text> }
            {products.map(eachProduct => <Text>Product Name: {eachProduct.productName} - Year: {eachProduct.year}</Text>)}
            <Text>Sum 2 and 3 = {sum2Number(2,3)}</Text>
            <Text>SUbtract 2 and 3 = {subtract2Number(2,3)}</Text>
        </View>
    )
}
*/
// export default mainScreen
