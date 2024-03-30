import react, {useState} from 'react';
import {ImageBackground, Text, View, TouchableOpacity, Alert, Modal, StyleSheet, Pressable} from 'react-native';
import {images, colors, fontSize} from '../../../constant';
import {Image} from 'react-native';
import {UIInput} from '../../../components';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {url} from '../../../service/cattalk';

function SignUpOTP({ route }) {
  const navigation = useNavigation();
  const [otp, setOTP] = useState('');
  const [message, setMessage] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { email } = route.params;

  const onSubmitHandler = async() => {
    try {
      const res = await axios.post(`${url}/user/auth-mail`, { otp: otp, email: email })
      if (res.data.status !== 200) {
        setMessage(res.data.message);
        setModalVisible(true)
      } else {
        setMessage(res.data.message);
        navigation.navigate('SignUpProfile', {token: res.data.token});
      }
    } catch (error) {
      setModalVisible(true)
      console.log(error);
    }
  }
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
              onPress={() => setModalVisible(!modalVisible)}>
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
            marginTop: 170,
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
          
          <View
            style={{
              marginTop: 10,
            }}>
            <Text
              style={{
                color: '#44C1C6',
                marginLeft: 13,
                fontWeight: 'bold',
                fontSize: fontSize.h4,
              }}>
              Your OTP you recieved in email
            </Text>
            <UIInput placeholder="Input your OTP" onChangeText={setOTP} width={250}></UIInput>
          </View>
          <TouchableOpacity
            onPress={onSubmitHandler}
            style={{
              width: 110,
              height: 40,
              backgroundColor: colors.primary,
              borderRadius: 100,
              marginTop: 20,
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
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
                  width: 100,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: fontSize.h3,
                }}>
                Next
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
              You have an account ?{' '}
            </Text>
            <Text
              onPress={() => navigation.navigate('Login')}
              style={{
                color: colors.primary,
                fontSize: fontSize.h5,
                fontWeight: 'bold',
              }}>
              Log in
            </Text>
          </View>
        </View>
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
    color: 'red',
    textAlign: 'center',
  },
});

export default SignUpOTP;
