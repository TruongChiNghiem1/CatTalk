import react, {useState, useEffect} from 'react';
import {ImageBackground, Text, View, TouchableOpacity} from 'react-native';
import {images, colors, fontSize} from '../../../constant';
import {Image} from 'react-native';
import {UIInput} from '../../../components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowRightToBracket} from '@fortawesome/free-solid-svg-icons/faArrowRightToBracket';
import {height} from '@fortawesome/free-solid-svg-icons/faMugSaucer';
import {AppRegistry} from 'react-native';
import {Button, Icon, WhiteSpace, WingBlank} from '@ant-design/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { DemoBlock } from './demo'
function Welcome(res) {
  const [fullname, setFullname] = useState('')
  const [avatar, setAvatar] = useState('https://cafebiz.cafebizcdn.vn/2019/5/17/photo-2-15580579930601897948260.jpg')

  async function getData() {
    const userStorage = await AsyncStorage.getItem('user');
    const user = JSON.parse(userStorage);
    setFullname(user.firstName + ' ' + user.lastName)
    setAvatar(user.avatar)
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <View
      style={{
        flex: 1,
      }}>
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
          <Image
            source={images.logo_vertical}
            style={{
              marginLeft: 10,
              width: 130,
              height: 40,
            }}></Image>
          <Image
            source={{ uri: avatar}}
            style={{
              marginRight: 10,
              width: 40,
              height: 40,
              borderRadius: 100,
            }}></Image>
        </View>
        <View
          style={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <UIInput placeholder="Search" width={400}></UIInput>
        </View>
        <View
          style={{
            display: 'flex',
            height: 600,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={images.cat_01}
            style={{
              marginRight: 10,
              width: 250,
              height: 120,
              borderRadius: 100,
            }}></Image>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 26,
                color: 'black',
                fontWeight: 'bold',
              }}>
              Good morning,{' '}
            </Text>
            <Text
              style={{
                color: colors.primary,
                fontSize: 26,
                fontWeight: 'bold',
              }}>
              {fullname}
            </Text>
          </View>
          <Text
            style={{
              color: colors.textGreen,
              fontSize: fontSize.h5,
              fontWeight: 'bold',
            }}>
            Greet someone to start the day ^^
          </Text>
          <TouchableOpacity
            onPress={() => {
              alert('You login');
            }}
            style={{
              width: 60,
              height: 60,
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
                width: 60,
                height: 60,
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: fontSize.h3,
                }}>
                <FontAwesomeIcon
                  style={{
                    color: 'white',
                  }}
                  icon={faArrowRightToBracket}
                  size={26}
                />
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 73,
            height: 55,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: colors.colorFooterMenu,
              height: 45,
              borderRadius: 30,
              width: 365,
            }}>
            <Text></Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default Welcome;
