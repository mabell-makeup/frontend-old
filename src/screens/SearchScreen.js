import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {Search} from "../scenes/search/Search"
import {NewsFeed} from "../scenes/search/NewsFeed"
import {SearchInput} from "../components/SearchInput"

const Stack = createStackNavigator()

const SearchStack = () => 
  <Stack.Navigator initialRouteName="NewsFeed">
    <Stack.Screen name="Search" component={Search} />
    <Stack.Screen 
      name="NewsFeed"
      component={NewsFeed}
      options={{
        headerStyle: {height: 60},
        // SearchbarのonChangeで再レンダリングされないように無名関数でラップする
        // eslint-disable-next-line react/display-name
        headerTitle: () => <SearchInput />, 
        headerTitleStyle: {width: "100%"},
        headerTitleAlign: "left"
      }}
    />
  </Stack.Navigator>

export const SearchScreen = () => <SearchStack />
