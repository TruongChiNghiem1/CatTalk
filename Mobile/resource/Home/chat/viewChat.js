import react from 'react';
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
import {
  Button,
  Icon,
  WhiteSpace,
  WingBlank,
  InputItem,
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
function RenderViewChat(res) {
  this.state = {
    value: '',
  };
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
            <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 10,
                }}>
                <Text style={{ 
                    color: 'black',
                    marginRight: 10,
                 }}>Back</Text>
                <Image
                    source={images.avatar}
                    style={{
                    marginRight: 10,
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                    }}></Image>
                <Text style={{ 
                    color: 'black',
                    fontWeight: "bold",
                    fontSize: fontSize.h3
                 }}>Trương Chí Nghiệm</Text>
            </View>
            <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 10,
                }}>
                <Text style={{ 
                    color: 'black',
                    marginRight: 10,
                 }}>Video</Text>
            </View>
        </View>
        <ScrollView>{renderViewChatItem()}</ScrollView>
        <View style={{ 
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
            }}>
            <InputItem
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
                Tệp
            </InputItem>
            </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default RenderViewChat;
