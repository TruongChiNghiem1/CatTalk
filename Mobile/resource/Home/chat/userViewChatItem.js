import react, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {images, colors, fontSize} from '../../../constant';
import {Image} from 'react-native';
import {UIInput} from '../../../components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import {faVideo} from '@fortawesome/free-solid-svg-icons/faVideo';
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons/faEllipsisVertical';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons/faPaperclip';
import {faFaceSmile} from '@fortawesome/free-solid-svg-icons/faFaceSmile';
import {faImage} from '@fortawesome/free-solid-svg-icons/faImage';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons/faTrashCan';
import {height} from '@fortawesome/free-solid-svg-icons/faMugSaucer';
import {AppRegistry} from 'react-native';
import BasicTabBarExample from '../layout/footer';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getMessage} from '../../../service/chat';

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

function RenderViewChatItem(res) {
  const {data} = res;
  const [avatar, setAvatar] = useState(
    'https://static.vecteezy.com/system/resources/previews/024/766/958/original/default-male-avatar-profile-icon-social-media-user-free-vector.jpg',
  );

  let chatItem = (
    <View style={{marginBottom: 10}}>
      <View
        style={{
          marginHorizontal: 10,
          marginTop: 10,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
          <Image
            source={{ uri: avatar }}
            style={{
              marginRight: 10,
              width: 30,
              height: 30,
              borderRadius: 100,
            }}></Image>
          <View>
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                width: 250,
                borderWidth: 0,
                paddingVertical: 11,
                paddingLeft: 12,
                paddingRight: 10,
                borderRadius: 20,
                backgroundColor: colors.colorFooterMenu,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: fontSize.h4,
                }}>
                {data.content}
              </Text>
              <Text
                style={{
                  color: '#b4b4b4c7',
                  marginTop: 5,
                  fontSize: fontSize.h5,
                }}>
                17:20
              </Text>
            </View>
            {/* <Image
              source={images.testImg2}
              style={{
                marginTop: 7,
                width: 250,
                height: 150,
                borderRadius: 20,
              }}></Image> */}
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

export default RenderViewChatItem;