import React from "react"
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs"
import {HomeScreen} from "../screens/HomeScreen"
import {SearchScreen} from "../screens/SearchScreen"
import {NavigationContainer} from "@react-navigation/native"

const Tab = createMaterialBottomTabNavigator()

export const BottomNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#fff"
        inactiveColor="#777"
        barStyle={{backgroundColor: "#333"}}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}