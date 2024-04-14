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
import moment from 'moment';

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
  const {data, profileUser, typeChat} = res;

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
            <View style={{ 
              height: '100',
              marginBottom: 5,
              // backgroundColor: 'red',
              display: 'flex',
              justifyContent: 'flex-end',
             }}>
              <Image
                source={{ uri: profileUser[0].avatar }}
                style={{
                  marginRight: 10,
                  borderRadius: 100,
                  width: 30,
                  height: 30,
                }}></Image>
            </View>
          <View>
            {typeChat == 'multi' ? 
              <Text style={{ 
                color: 'black',
                marginLeft: 5,
                marginBottom: 6
                }}>{profileUser[0].firstName + ' ' + profileUser[0].lastName}
              </Text> : <></>
            }
            
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
                {moment(data.createdAt).format('HH:mm')}
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
