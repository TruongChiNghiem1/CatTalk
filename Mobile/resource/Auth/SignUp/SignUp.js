import react from 'react';
import {ImageBackground, Text, View, TouchableOpacity} from 'react-native';
import {images, colors, fontSize} from '../../../constant';
import {Image} from 'react-native';
import {UIInput} from '../../../components';

function SignUp(res) {
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
            marginTop: 70,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={images.logo_vertical}
            style={{
              width: 200,
              height: 200,
            }}></Image>
          <View
            style={{
              width: 300,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'space-between',
            }}>
            <View
              style={{
                marginTop: 10,
                width: 145,
              }}>
              <Text
                style={{
                  color: '#44C1C6',
                  marginLeft: 13,
                  fontWeight: 'bold',
                  fontSize: fontSize.h4,
                }}>
                First name
              </Text>
              <UIInput placeholder="First name" width={145}></UIInput>
            </View>
            <View
              style={{
                marginTop: 10,
                width: 145,
              }}>
              <Text
                style={{
                  color: '#44C1C6',
                  marginLeft: 13,
                  fontWeight: 'bold',
                  fontSize: fontSize.h4,
                }}>
                Last name
              </Text>
              <UIInput placeholder="Last name" width={145}></UIInput>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
            }}>
            <Text
              style={{
                color: '#44C1C6',
                marginLeft: 13,
                fontWeight: 'bold',
                fontSize: fontSize.h4,
              }}>
              Username
            </Text>
            <UIInput placeholder="Username"></UIInput>
          </View>
          <View
            style={{
              marginTop: 10,
            }}>
            <Text
              style={{
                color: '#44C1C6',
                marginLeft: 13,
                fontWeight: 'bold',
                fontSize: fontSize.h4,
              }}>
              Email
            </Text>
            <UIInput placeholder="Email"></UIInput>
          </View>
          <View
            style={{
              marginTop: 10,
            }}>
            <Text
              style={{
                color: '#44C1C6',
                marginLeft: 13,
                fontWeight: 'bold',
                fontSize: fontSize.h4,
              }}>
              Password
            </Text>
            <UIInput placeholder="Password" isPassword={true}></UIInput>
          </View>
          <View
            style={{
              marginTop: 10,
            }}>
            <Text
              style={{
                color: '#44C1C6',
                marginLeft: 13,
                fontWeight: 'bold',
                fontSize: fontSize.h4,
              }}>
              Confirm password
            </Text>
            <UIInput placeholder="Confirm password" isPassword={true}></UIInput>
          </View>
          <TouchableOpacity
            onPress={() => {
              alert('You login');
            }}
            style={{
              width: 110,
              height: 40,
              backgroundColor: colors.primary,
              borderRadius: 100,
              marginTop: 20,
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
            title="Login">
            <View
              style={{
                width: 63,
                height: 65,
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <Text
                style={{
                  width: 100,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: fontSize.h3,
                }}>
                Sign up
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 30,
              display: 'flex',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: fontSize.h5,
                color: 'black',
              }}>
              You have an account ?{' '}
            </Text>
            <Text
              onPress={() => navigation.navigate('SignUp')}
              style={{
                color: colors.primary,
                fontSize: fontSize.h5,
                fontWeight: 'bold',
              }}>
              Log in
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default SignUp;
