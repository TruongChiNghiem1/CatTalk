// import { createStackNavigator } from 'react-navigation';
import * as React from 'react';
import Welcome from '../resource/Home/Welcome';
import BasicTabBarExample from '../resource/Home/layout/footer';
import Test from '../resource/Home/test/test';
import RenderViewChat from '../resource/Home/chat/viewChat';
import RenderProfile from '../resource/Home/profile/profile';
import {NavigationContainer} from '@react-navigation/native';
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

const Home = () => {
  const Stack = createStackNavigator();
  return (
    // <NavigationContainer style={screenOptions}>
    //   <Stack.Navigator>
    //     <Stack.Screen name="BasicTabBarExample" component={BasicTabBarExample} />
    //     <Stack.Screen name="RenderViewChat" component={RenderViewChat} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <BasicTabBarExample></BasicTabBarExample>
  );
};

export default Home;
