// import { createStackNavigator } from 'react-navigation';
import * as React from 'react';
import Login from '../resource/Auth/login/login';
import SignUpEmail from '../resource/Auth/SignUp/SignUpEmail';
import SignUpOTP from '../resource/Auth/SignUp/SignUpOTP';
import SignUpProfile from '../resource/Auth/SignUp/SignUpProfile';
import Welcome from '../resource/Home/Welcome';
import BasicTabBarExample from '../resource/Home/layout/footer';
import Test from '../resource/Home/test/test';
import RenderViewChat from '../resource/Home/chat/viewChat';
import RenderProfile from '../resource/Home/profile/profile';

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
    <NavigationContainer style={screenOptions}>
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
        <Stack.Screen
          name="BasicTabBarExample"
          component={BasicTabBarExample}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Auth;
