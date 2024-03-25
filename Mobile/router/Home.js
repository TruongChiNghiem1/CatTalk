// import { createStackNavigator } from 'react-navigation';
import * as React from 'react';
import Welcome from '../resource/Home/Welcome';
import BasicTabBarExample from '../resource/Home/layout/footer';
import Test from '../resource/Home/test/test';
import RenderProfile from '../resource/Home/profile/profile';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../resource/Auth/login/login';
import SignUp from '../resource/Auth/SignUp/SignUpEmail';
import RenderViewChat from '../resource/Home/chat/viewChat';
import Setting from '../resource/Home/setting/setting';

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

const Home = () => {
  const Stack = createStackNavigator();
  return (
    // <NavigationContainer style={screenOptions}>
    //   <Stack.Navigator>
    //     <Stack.Screen name="BasicTabBarExample" component={BasicTabBarExample} />
    //     <Stack.Screen name="RenderProfile" component={RenderProfile} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <BasicTabBarExample></BasicTabBarExample>
  );
};

export default Home;
