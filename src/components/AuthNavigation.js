import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {BottomNavigation} from "./BottomNavigation"
import {LoginScreen} from "../screens/LoginScreen"
import {NavigationContainer} from "@react-navigation/native"

const Stack = createStackNavigator()

const navigatorProps = ({
  initialRouteName: "LoginScreen",
  screenOptions: {
    headerStyle: {height: 70},
    headerTitleStyle: {width: "70%"},
    headerTitleAlign: "left",
    headerBackTitleVisible: false
  }
})

export const AuthNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator {...navigatorProps}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="LoggedIn" component={BottomNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}