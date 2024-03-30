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
import {height} from '@fortawesome/free-solid-svg-icons/faMugSaucer';
import {AppRegistry} from 'react-native';
import BasicTabBarExample from '../layout/footer';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
            source={images.avatar}
            style={{
              marginRight: 10,
              width: 30,
              height: 30,
              borderRadius: 100,
            }}></Image>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
            <Text
              style={{
                color: '#b4b4b4c7',
                marginTop: 5,
                fontSize: fontSize.h5,
              }}>
              12:34
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          marginHorizontal: 10,
          marginTop: 10,
          display: 'flex',
          alignItems: 'flex-end',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
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
              backgroundColor: '#FFEFD8',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: fontSize.h4,
              }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
            <Text
              style={{
                color: '#b4b4b4c7',
                marginTop: 5,
                fontSize: fontSize.h5,
              }}>
              16:04
            </Text>
          </View>
        </View>
        <Image
          source={images.testImg}
          style={{
            marginTop: 7,
            width: 250,
            height: 150,
            borderRadius: 20,
          }}></Image>
      </View>

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
            source={images.avatar}
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
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
            <Image
              source={images.testImg2}
              style={{
                marginTop: 7,
                width: 250,
                height: 150,
                borderRadius: 20,
              }}></Image>
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
const showActionSheet = () => {
  const BUTTONS = [
    <View style={{ width: 400 }}>
      <List.Item extra={<Switch />}>Mute message</List.Item>
    </View>,
    <View style={{  }}>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <FontAwesomeIcon
          style={{color: 'red', marginRight: 8}}
          icon={faTrashCan}
        />
        <Text style={{color: 'red', fontSize: fontSize.h3}}>Delete chat </Text>
      </View>
    </View>,
  ];
  ActionSheet.showActionSheetWithOptions(
    {
      title: 'Option',
      message: 'Description',
      options: BUTTONS,
      cancelButtonIndex: 3,
      // destructiveButtonIndex: 3,
    },
    // (buttonIndex: any) => {
    // this.setState({clicked: BUTTONS[buttonIndex]});
    // },
  );
};

function RenderViewChat(res) {
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
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: colors.bgHeader,
              height: 60,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 10,
              }}>
              <TouchableOpacity onPress={() => navigation.navigate('BasicTabBarExample')}>
              <FontAwesomeIcon
                style={{marginRight: 10}}
                color={colors.primary}
                size={20}
                icon={faChevronLeft}
              />
              </TouchableOpacity>
              <Image
                source={images.avatar}
                style={{
                  marginRight: 10,
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                }}></Image>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: fontSize.h3,
                }}>
                Trương Chí Nghiệm
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 10,
              }}>
              <FontAwesomeIcon
                style={{}}
                size={23}
                color={colors.primary}
                icon={faVideo}
              />
              <Button
                style={{
                  backgroundColor: colors.bgHeader,
                  borderColor: colors.bgHeader,
                  marginHorizontal: 5,
                  width: 15,
                  height: 23,
                }}
                onPress={showActionSheet}>
                <FontAwesomeIcon
                  style={{marginHorizontal: 10}}
                  color={colors.primary}
                  size={20}
                  icon={faEllipsisVertical}
                />
              </Button>
            </View>
          </View>
          <ScrollView>{renderViewChatItem()}</ScrollView>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 5,
            }}>
            <View
              style={{
                backgroundColor: colors.colorFooterMenu,
                borderRadius: 20,
                width: 400,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <FontAwesomeIcon
                color={colors.primary}
                style={{marginLeft: 15, marginRight: 5}}
                size={20}
                icon={faPaperclip}
              />
              {/* <InputItem
              // clear
              // error
              // value={this.state.value}
              // onChange={(value: any) => {
              // this.setState({
              //     value,
              // });
              // }}
              style={{color: 'black'}}
              placeholderTextColor={'#959595'}
              // extra="Sticker"
              placeholder="Tin nhắn">
            </InputItem> */}
              <TextareaItem
                rows={1}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'black',
                  width: 270,
                  backgroundColor: colors.colorFooterMenu,
                }}
                placeholderTextColor={'#959595'}
                placeholder="Tin nhắn"
              />
              <FontAwesomeIcon
                style={{marginRight: 5}}
                color={colors.primary}
                size={20}
                icon={faFaceSmile}
              />
              <FontAwesomeIcon
                style={{marginRight: 15}}
                color={colors.primary}
                size={20}
                icon={faImage}
              />
            </View>
          </View>
        </ImageBackground>
      </Provider>
    </View>
  );
}

export default RenderViewChat;
