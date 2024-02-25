import react from 'react';
import {ImageBackground, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {images, colors, fontSize} from '../../../constant';
import {Image} from 'react-native';
import {UIInput} from '../../../components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowRightToBracket} from '@fortawesome/free-solid-svg-icons/faArrowRightToBracket';
import {height} from '@fortawesome/free-solid-svg-icons/faMugSaucer';
import {AppRegistry} from 'react-native';
import {Button, Icon, WhiteSpace, WingBlank} from '@ant-design/react-native';

// import { DemoBlock } from './demo'
function renderChatItem() {
  let chatItem = (
    <View
      style={{
        margin: 15,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Image
          source={images.avatar}
          style={{
            marginRight: 10,
            width: 50,
            height: 50,
            borderRadius: 100,
          }}></Image>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-around',
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: fontSize.h3,
            }}>
            Trương Chí Nghiệm
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: fontSize.h4,
            }}>
            Em ăn gì chưa ?
          </Text>
        </View>
      </View>
    </View>
  );

  let chatItems = [];
  for (let i = 0; i < 12; i++) {
    chatItems.push(chatItem);
  }
  return <>{chatItems}</>;
}
function ChatItem(res) {
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
              source={images.avatar}
              style={{
                marginRight: 10,
                width: 40,
                height: 40,
                borderRadius: 100,
              }}></Image>
          </View>
          <ScrollView>
            {renderChatItem()}
          </ScrollView>
        </ImageBackground>
      </View>
    
  );
}

export default ChatItem;
