import react from 'react';
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
import {faCommentDots} from '@fortawesome/free-solid-svg-icons/faCommentDots';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons/faUserPlus';
import {AppRegistry} from 'react-native';
import BasicTabBarExample from '../layout/footer';
import {DrawerActions, useNavigation} from '@react-navigation/native';

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

// import { DemoBlock } from './demo'
function renderViewChatItem() {
  let chatItem = (
    <View
      style={{
        width: 450,
        marginLeft: -20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <View
        style={{
          marginTop: 140,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <Image
            source={images.avatar}
            style={{
              width: 130,
              height: 130,
              borderRadius: 100,
              zIndex: 1,
            }}></Image>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            width: 360,
            display: 'flex',
            justifyContent: 'flex',
            alignItems: 'center',
            height: 440,
            marginTop: -35,
            borderRadius: 30,
            position: 'relative',
          }}>
            <View style={{ 
                marginTop: 40,
             }}>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: fontSize.h1 }}>Trương Chí Nghiệm</Text>
            </View>
            <View 
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 20,
            }}>
                <View
                    style={{
                    display: 'flex',
                    flexDirection: 'row',
                    padding: 10,
                    borderRadius: 20,
                    backgroundColor: colors.colorBgButton,
                    marginRight: 20,
                    marginBottom: 50,
                    }}>
                    <FontAwesomeIcon
                    style={{marginRight: 7}}
                    color="white"
                    icon={faUserPlus}
                    />
                    <Text style={{fontWeight: 'bold', color: 'white'}}>Add friend</Text>
                </View>
                <View
                    style={{
                    display: 'flex',
                    flexDirection: 'row',
                    padding: 10,
                    borderRadius: 20,
                    backgroundColor: colors.colorBgButton,
                    marginBottom: 50,
                    }}>
                    <FontAwesomeIcon
                    style={{marginRight: 7}}
                    color="white"
                    icon={faCommentDots}
                    />
                    <Text style={{fontWeight: 'bold', color: 'white'}}>Chat</Text>
                </View>
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
this.state = {
  value: '',
  clicked: 'none',
  text: '',
};

function RenderProfile(res) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Provider>
        <ImageBackground
          source={images.background}
          style={{
            flex: 1,
          }}>
          <View
            style={{
              flex: 1,
              position: 'relative',
              width: 412,
              height: 200,
            }}>
            <Image
              source={images.backgroundProfile}
              style={{
                width: 420,
                height: 250,
                position: 'absolute',
                top: 0,
                left: 0,
              }}></Image>
            <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesomeIcon
                style={{marginTop: 15, marginLeft: 10}}
                color={colors.primary}
                size={20}
                icon={faChevronLeft}
              />
            </TouchableOpacity>
            </View>
            <ScrollView>{renderViewChatItem()}</ScrollView>
          </View>
        </ImageBackground>
      </Provider>
    </View>
  );
}

export default RenderProfile;
