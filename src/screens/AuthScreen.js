import React from "react"
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs"
import {HomeScreen} from "./HomeScreen"
import {SearchScreen} from "./SearchScreen"
import {IconButton} from "react-native-paper"

const Tab = createMaterialBottomTabNavigator()

export const AuthScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      inactiveColor="#777"
      barStyle={{backgroundColor: "#333"}}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{tabBarIcon: () => <IconButton icon="home" size={20} color="#FFF" />}} />
      <Tab.Screen name="SearchScreen" component={SearchScreen} options={{tabBarIcon: () => <IconButton icon="magnify" size={20} color="#FFF" />}} />
    </Tab.Navigator>
  )
}