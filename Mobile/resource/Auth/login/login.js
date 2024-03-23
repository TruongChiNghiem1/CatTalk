import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  View,
  TextInput,
  Linking,
  TouchableOpacity,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {images, fontSize, colors} from '../../../constant';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowRightToBracket} from '@fortawesome/free-solid-svg-icons/faArrowRightToBracket';
import {SvgUri} from 'react-native-svg';
import {UIInput} from '../../../components';
// import { useNavigate } from 'react-router-native';

const Login = (res) => {
  const {navigation} = res;
  // const {userInfo, setUserInfo} = useState({
  //   email: '',
  //   password: '',
  // });
  // const {email, password} = userInfo;
  // const handleLogIn = async () => {
  //   alert(userInfo, setUserInfo);
  //   setLoading(true);
  //   try {
  //     let values = await form.validateFields();
  //     const user = await logIn(values);
  //     if (user.data.status == 200) {
  //       removeCookie('token');
  //       setCookie('loginToken', user.data.accessToken);
  //       setCookie('user', user.data.user);
  //       setUser(user.data.user);
  //       message.success(user.data.message);
  //       navigate('/home');
  //     } else if (user.data.status == 401) {
  //       user.data.message.map(item => message.warning(item));
  //     } else {
  //       message.error(user.data.message);
  //     }
  //     setLoading(false);
  //   } catch (error) {
  //     console.log('Error: ', +error);
  //   }
  // };
  // let navigate = useNavigate;
  return (
    <View
      style={{
        // backgroundColor: '#83FBFF',
        flex: 1,
      }}>
      <ImageBackground
        source={images.background}
        resizeMode="cover"
        style={{
          flex: 1,
        }}>
        <View
          style={{
            marginTop: 150,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={images.logo}
            style={{
              width: 200,
              height: 200,
            }}></Image>
          <UIInput placeholder="email"></UIInput>
          <UIInput placeholder="Password"></UIInput>
          <View style={{width: 300, display: 'flex', alignItems: 'flex-end'}}>
            <Text
              onPress={() => Linking.openURL('')}
              style={{
                width: 95,
                fontSize: fontSize.h5,
                marginBottom: 20,
                color: 'black',
              }}>
              Forgot password
            </Text>
          </View>
          {/* // onPress={handleLogIn} */}
          <TouchableOpacity
            style={{
              width: 65,
              height: 65,
              backgroundColor: colors.bgInput,
              borderRadius: 100,
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
                  textAlign: 'center',
                }}>
                <FontAwesomeIcon
                  style={{
                    color: colors.textButton,
                  }}
                  icon={faArrowRightToBracket}
                  size={22}
                />
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
              You don't have account ?{' '}
            </Text>
            <Text
              onPress={() => navigation.navigate('SignUp')}
              style={{
                color: colors.primary,
                fontSize: fontSize.h5,
                fontWeight: 'bold',
              }}>
              Sign up
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;
/*
import {sum2Number, subtract2Number} from '../utilies/caculator'
const mainScreen = (props) => {
    // alert(`x = ${props.x} y = ${props.y}`)
    // return <Text>Main screen nghiem x = {props.x} y = {props.y}</Text>

    //Destructer
    const {x, y} = props
    const {person} = props
    const {name, age, email} = person
    const {products} = props

    return (
        <View>
            <Text>Main screen nghiem x = {x} y = {y}</Text>
            <Text>
                Tên: {name},
                Tuổi: {age},
                Email: {email}
            </Text>
            //{ <Text>{JSON.stringify(products)}</Text> }
            {products.map(eachProduct => <Text>Product Name: {eachProduct.productName} - Year: {eachProduct.year}</Text>)}
            <Text>Sum 2 and 3 = {sum2Number(2,3)}</Text>
            <Text>SUbtract 2 and 3 = {subtract2Number(2,3)}</Text>
        </View>
    )
}
*/
// export default mainScreen
