/* eslint-disable react/display-name */
import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {Search} from "../scenes/search/Search"
import {NewsFeed} from "../scenes/search/NewsFeed"
import {SearchInput} from "../components/SearchInput"
import {Text} from "react-native-paper"

const Stack = createStackNavigator()

export const SearchScreen = ({navigation}) => 
  <Stack.Navigator
    initialRouteName="NewsFeed"
    screenOptions={{
      headerStyle: {height: 60},
      headerTitleStyle: {width: "100%"},
      headerTitleAlign: "left",
      headerBackTitleVisible: false
    }}
  >
    {/* SearchbarのonChangeで再レンダリングされないようにheaderTitleにわたすコンポーネントは無名関数でラップする */}
    <Stack.Screen name="Search" component={Search} options={{headerTitle: () => <SearchInput isFocused={true} />}}/>
    <Stack.Screen name="NewsFeed" component={NewsFeed} options={{headerTitle: () => <Text onPress={() => navigation.reset({index: 0, routes: [{name: "Search"}]})}>Search</Text>}}/>
  </Stack.Navigator>