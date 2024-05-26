import react, {useState, useEffect} from 'react';
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
import {height} from '@fortawesome/free-solid-svg-icons/faMugSaucer';
import {AppRegistry} from 'react-native';
import {Button, Icon, WhiteSpace, WingBlank} from '@ant-design/react-native';
import {faPhone} from '@fortawesome/free-solid-svg-icons/faPhone';
import {faVideo} from '@fortawesome/free-solid-svg-icons/faVideo';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {io} from 'socket.io-client';

function ViewPhoneBookItem(props) {
  var {data} = props;
  const navigation = useNavigation();
  const [socket, setSocket] = useState(io.connect('http://192.168.1.25:2090'));

  useEffect(() => {
    socket.on('connection', () => {
      console.log('Connected to the Socket.IO server');
    });
  }, []);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('RenderProfile', {data: data})}
      style={{
        margin: 15,
      }}>
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
            source={{uri: data.avatar}}
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
            width: 60,
          }}>
          <FontAwesomeIcon
            size={20}
            icon={faPhone}
            color={colors.colorBgButton}
          />
          <FontAwesomeIcon
            size={20}
            icon={faVideo}
            color={colors.colorBgButton}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ViewPhoneBookItem;
