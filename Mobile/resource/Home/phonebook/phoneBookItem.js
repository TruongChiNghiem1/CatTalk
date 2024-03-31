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
  const [avatar, setAvatar] = useState('https://static.vecteezy.com/system/resources/previews/024/766/958/original/default-male-avatar-profile-icon-social-media-user-free-vector.jpg')

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
            {data && data.length ? (
              <>
                {data.map(item => (
                  <ViewPhoneBookItem data={item} />
                ))}
              </>
            ) : (
              <View style={{ 
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
                  <Text style={{ 
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
};

export default PhoneBookItem;
