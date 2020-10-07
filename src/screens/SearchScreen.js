import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {Search} from "../scenes/search/Search"
import {NewsFeed} from "../scenes/search/NewsFeed"

const Stack = createStackNavigator()

const SearchStack = () => 
  <Stack.Navigator initialRouteName="NewsFeed">
    <Stack.Screen name="Search" component={Search} />
    <Stack.Screen name="NewsFeed" component={NewsFeed} />
  </Stack.Navigator>

export const SearchScreen = () => <SearchStack />
