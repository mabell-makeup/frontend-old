import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {Search} from "../scenes/Search"

const Stack = createStackNavigator()

const SearchStack = () => 
  <Stack.Navigator initialRouteName="Search">
    <Stack.Screen name="Search" component={Search} />
  </Stack.Navigator>

export const SearchScreen = () => <SearchStack />
