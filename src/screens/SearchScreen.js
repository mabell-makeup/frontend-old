/* eslint-disable react/display-name */
import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {Search} from "../scenes/search/Search"
import {NewsFeed} from "../scenes/search/NewsFeed"
import {SearchInput} from "../components/SearchInput"
import {Text} from "react-native-paper"
import {SearchProvider} from "../stores/searchStore"
import {SelectColor} from "../scenes/search/SelectColor"
import {SelectCountry} from "../scenes/search/SelectCountry"

const Stack = createStackNavigator()

export const SearchScreen = ({navigation}) => 
  <SearchProvider>
    <Stack.Navigator
      initialRouteName="NewsFeed"
      screenOptions={{
        headerStyle: {height: 60},
        headerTitleStyle: {width: "70%"},
        headerTitleAlign: "left",
        headerBackTitleVisible: false
      }}
    >
      {/* SearchbarのonChangeで再レンダリングされないようにheaderTitleにわたすコンポーネントは無名関数でラップする */}
      <Stack.Screen name="Search" component={Search} options={{
        headerTitle: () => <SearchInput isFocused={true} />,
        headerRight: () => <Text onPress={() => navigation.reset({index: 0, routes: [{name: "NewsFeed"}]})}>キャンセル</Text>,
        headerRightContainerStyle: {marginRight: 5}
      }}/>
      <Stack.Screen name="SelectColor" component={SelectColor} options={{
        headerRight: () => <Text onPress={() => navigation.reset({index: 0, routes: [{name: "NewsFeed"}]})}>キャンセル</Text>,
        headerRightContainerStyle: {marginRight: 5}
      }}/>
      <Stack.Screen name="SelectCountry" component={SelectCountry} options={{
        headerRight: () => <Text onPress={() => navigation.reset({index: 0, routes: [{name: "NewsFeed"}]})}>キャンセル</Text>,
        headerRightContainerStyle: {marginRight: 5}
      }}/>

      <Stack.Screen name="NewsFeed" component={NewsFeed} options={{headerTitle: () => <Text onPress={() => navigation.reset({index: 0, routes: [{name: "Search"}]})}>Search</Text>}}/>
    </Stack.Navigator>
  </SearchProvider>