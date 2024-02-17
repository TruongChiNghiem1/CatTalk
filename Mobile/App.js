import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./resource/Auth/login/login"

// const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <Login></Login>
    </>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="login" component={Login} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default App;