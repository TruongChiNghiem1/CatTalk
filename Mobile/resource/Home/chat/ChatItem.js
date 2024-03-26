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
import {faArrowRightToBracket} from '@fortawesome/free-solid-svg-icons/faArrowRightToBracket';
import {height} from '@fortawesome/free-solid-svg-icons/faMugSaucer';
import {AppRegistry} from 'react-native';
import {Button, Icon, WhiteSpace, WingBlank} from '@ant-design/react-native';
import UserChatItem from './userChatItem';
import axios from 'axios';
import {url} from '../../../service/cattalk';
// import { DemoBlock } from './demo'

const ChatItem = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState('https://cafebiz.cafebizcdn.vn/2019/5/17/photo-2-15580579930601897948260.jpg')

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${url}/user/test-data`,
      );
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
        {loading ? (
          <Text>loading....</Text>
        ) : (
          <ScrollView>
            {data.length ? (
              <>
                {data.map(item => (
                  <UserChatItem data={item} />
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

export default ChatItem;
