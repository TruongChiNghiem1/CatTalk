import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './resource/Auth/login/login';
import SignUp from './resource/Auth/SignUp/SignUp';
import Welcome from './resource/Home/Welcome';
import BasicTabBarExample from './resource/Home/layout/footer';
import RenderViewChat from './resource/Home/chat/viewChat';

// const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <RenderViewChat></RenderViewChat>
    </>
    // <NavigationContainer> 
    //   <Stack.Navigator>
    //     <Stack.Screen name="login" component={Login} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default App;
