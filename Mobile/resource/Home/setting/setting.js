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
import {faArrowRightToBracket} from '@fortawesome/free-solid-svg-icons/faArrowRightToBracket';
import {faGear} from '@fortawesome/free-solid-svg-icons/faGear';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import axios from 'axios';
// import { DemoBlock } from './demo'

const Setting = (res) => {
  const navigation = useNavigation();
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
              onPress={() => navigation.navigate('RenderProfile')}
              style={{
                backgroundColor: colors.colorHide,
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
                  width: 370,
                }}>
                <Image
                  source={images.avatar}
                  style={{
                    marginRight: 10,
                    width: 50,
                    height: 50,
                    borderRadius: 100,
                  }}></Image>
                <View>
                  <Text
                    style={{
                      fontSize: 19,
                      color: 'black',
                      marginLeft: 10,
                      marginTop: 3,
                      fontWeight: 'bold',
                    }}>
                    Trương Chí Nghiệm
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'black',
                      marginLeft: 10,
                      marginTop: 3,
                    }}>
                    Xem trang cá nhân
                  </Text>
                </View>
              </View>
            </Button>

            <Button
              style={{
                marginTop: 15,
                marginBottom: 5,
                backgroundColor: colors.colorHide,
                border: 'none',
                borderColor: colors.colorHide,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: 420,
                height: 60,
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
                  icon={faGear}
                  color={colors.colorBgButton}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 19,
                      color: 'black',
                      marginLeft: 20,
                      fontWeight: 'bold',
                    }}>
                    Cài đặt
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'black',
                      marginLeft: 20,
                      marginTop: 3,
                    }}>
                    Cài đặt cá nhân
                  </Text>
                </View>
              </View>
            </Button>

            <Button
              style={{
                marginTop: 0,
                marginBottom: 10,
                backgroundColor: colors.colorHide,
                border: 'none',
                borderColor: colors.colorHide,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: 420,
                height: 60,
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
                  icon={faGear}
                  color={colors.colorBgButton}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 19,
                      color: 'black',
                      marginLeft: 20,
                      fontWeight: 'bold',
                    }}>
                    Đổi mật khẩu
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'black',
                      marginLeft: 20,
                      marginTop: 3,
                    }}>
                    Đổi mật khẩu
                  </Text>
                </View>
              </View>
            </Button>

            <View style={{}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={{
                  width: 210,
                  height: 50,
                  backgroundColor: colors.bgInput,
                  borderRadius: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="Login">
                <View
                  style={{
                    width: 250,
                    height: 55,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <FontAwesomeIcon
                    style={{
                      color: colors.textButton,
                      marginRight: 10,
                    }}
                    icon={faArrowRightToBracket}
                    size={22}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      color: colors.textButton,
                      fontSize: 20,
                    }}>
                    Đăng xuất
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <WhiteSpace />
          </WingBlank>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Setting;
