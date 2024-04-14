// import { createStackNavigator } from 'react-navigation';
import React, {useEffect, useState} from 'react';
import Login from '../resource/Auth/login/login';
import SignUpEmail from '../resource/Auth/SignUp/SignUpEmail';
import SignUpOTP from '../resource/Auth/SignUp/SignUpOTP';
import SignUpProfile from '../resource/Auth/SignUp/SignUpProfile';
import Welcome from '../resource/Home/Welcome';
import BasicTabBarExample from '../resource/Home/layout/footer';
import Test from '../resource/Home/test/test';
import RenderViewChat from '../resource/Home/chat/viewChat';
import AddFriend from '../resource/Home/addfriend/addfriend';
import CreateGroup from '../resource/Home/group/createGroup';
import RenderProfile from '../resource/Home/profile/profile';
import RenderMyProfile from '../resource/Home/profile/myProfile';
import RenderViewChatGroup from '../resource/Home/group/viewChatGroup';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  DrawerActions,
  useNavigation,
  NavigationContainer,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// Thay đổi header
const screenOptions = {
  headerStyle: {
    backgroundColor: 'red',
  },
  headerTintColor: '#red',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const Auth = () => {
  const Stack = createStackNavigator();
  // const navigation = useNavigation()
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarColor: 'white',
        headerStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUpEmail" component={SignUpEmail} />
      <Stack.Screen name="SignUpOTP" component={SignUpOTP} />
      <Stack.Screen name="SignUpProfile" component={SignUpProfile} />
      <Stack.Screen name="Home" component={App} />
    </Stack.Navigator>
  );
};

const App = () => {
  const Stack = createStackNavigator();
  // const navigation = useNavigation()
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarColor: 'white',
        headerStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="BasicTabBarExample" component={BasicTabBarExample} />
      <Stack.Screen name="RenderViewChat" component={RenderViewChat} />
      <Stack.Screen name="RenderProfile" component={RenderProfile} />
      <Stack.Screen name="RenderMyProfile" component={RenderMyProfile} />
      <Stack.Screen name="AddFriend" component={AddFriend} />
      <Stack.Screen name="CreateGroup" component={CreateGroup} />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="RenderViewChatGroup" component={RenderViewChatGroup} />
    </Stack.Navigator>
  );
};

const Router = () => {
  const [isLogin, setIsLogin] = useState(false);
  const getData = async () => {
    const data = await AsyncStorage.getItem('isLogin');
    const token = await AsyncStorage.getItem('token');
    // const loginWhat = data && !token;
    const loginWhat = data;
    setIsLogin(loginWhat);
  };

  useEffect(() => {
    getData();
    setTimeout(() => {}, 900);
  }, [isLogin]);

  return (
    <NavigationContainer style={screenOptions}>
      {isLogin ? <App /> : <Auth />}
    </NavigationContainer>
  );
};

export default Router;
