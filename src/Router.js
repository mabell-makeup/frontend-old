import React from "react"
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import {Home} from "./components/pages/Home"
import {Login} from "./components/pages/Login"


const Stack = createStackNavigator()

export const Router = () => 
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  </NavigationContainer>