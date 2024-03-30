import react, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {images, colors, fontSize} from '../../../constant';
import {Image} from 'react-native';
import {UIInput} from '../../../components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons/faUserPlus';
import {faUserGroup} from '@fortawesome/free-solid-svg-icons/faUserGroup';
import {height} from '@fortawesome/free-solid-svg-icons/faMugSaucer';
import {AppRegistry} from 'react-native';
import {Button, Icon, WhiteSpace, WingBlank} from '@ant-design/react-native';
import ViewPhoneBookItem from './viewPhoneBookItem';
import axios from 'axios';
import {url} from '../../../service/cattalk';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import { getFriends } from '../../../service/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { DemoBlock } from './demo'

const PhoneBookItem = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState('https://cafebiz.cafebizcdn.vn/2019/5/17/photo-2-15580579930601897948260.jpg')

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await getFriends(token)
      setData(res.data.data);
      setLoading(false);
      const userStorage = await AsyncStorage.getItem('user');
      const user = JSON.parse(userStorage);
      setAvatar(user.avatar)
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
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid red',
            borderColor: 'red',
          }}>
          <WingBlank
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <WhiteSpace />
            <Button
              onPress={() => navigation.navigate('AddFriend')}
              style={{
                marginTop: -10,
                // backgroundColor: colors.colorHide,
                border: 'none',
                borderColor: colors.colorHide,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: 420,
                height: 55,
              }}>
              <View
                style={{
                  // backgroundColor: colors.colorHide,
                  border: 'none',
                  borderColor: colors.colorHide,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: 360,
                }}>
                <FontAwesomeIcon
                  size={25}
                  icon={faUserPlus}
                  color={colors.colorBgButton}
                />
                <Text
                  style={{
                    fontSize: 19,
                    color: 'black',
                    marginLeft: 20,
                    marginTop: 3,
                  }}>
                  Thêm bạn
                </Text>
              </View>
            </Button>

            <Button
              style={{
                marginTop: 0,
                // backgroundColor: colors.colorHide,
                border: 'none',
                borderColor: colors.colorHide,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: 420,
                height: 55,
              }}>
              <View
                style={{
                  // backgroundColor: colors.colorHide,
                  border: 'none',
                  borderColor: colors.colorHide,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: 360,
                }}>
                <FontAwesomeIcon
                  size={25}
                  icon={faUserGroup}
                  color={colors.colorBgButton}
                />
                <Text
                  style={{
                    fontSize: 19,
                    color: 'black',
                    marginLeft: 20,
                    marginTop: 3,
                  }}>
                  Lời mời kết bạn
                </Text>
              </View>
            </Button>
            <WhiteSpace />
          </WingBlank>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <UIInput placeholder="Search" width={340}></UIInput>
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
            <FontAwesomeIcon icon={faUserPlus} color={colors.colorBgButton} />
          </View>
        </View>
        {loading ? (
          <Text>loading....</Text>
        ) : (
          <ScrollView>
            {data ? (
              <>
                {data.map(item => (
                  <ViewPhoneBookItem data={item} />
                ))}
              </>
            ) : (
              <Text>Empty</Text>
            )}
          </ScrollView>
        )}
      </ImageBackground>
    </View>
  );
};

export default PhoneBookItem;
