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
import {SelectHairStyle} from "../scenes/search/SelectHairStyle"
import {SelectItems} from "../scenes/search/SelectItems"

const Stack = createStackNavigator()

const createDefaultScreenOptions = navigation => ({
  headerRight: () => <Text onPress={() => navigation.reset({index: 0, routes: [{name: "NewsFeed"}]})}>キャンセル</Text>,
  headerRightContainerStyle: {marginRight: 5}
})

const navigatorProps = ({
  initialRouteName: "NewsFeed",
  screenOptions: {
    headerStyle: {height: 60},
    headerTitleStyle: {width: "70%"},
    headerTitleAlign: "left",
    headerBackTitleVisible: false
  }
})

export const SearchScreen = ({navigation}) => {
  const defaultScreenOptions = createDefaultScreenOptions(navigation)

  return (
    <SearchProvider>
      <Stack.Navigator {...navigatorProps}>
        {/* SearchbarのonChangeで再レンダリングされないようにheaderTitleにわたすコンポーネントは無名関数でラップする */}
        <Stack.Screen name="Search" component={Search} options={{
          ...defaultScreenOptions,
          headerTitle: () => <SearchInput isFocused={true} />
        }}/>
        <Stack.Screen name="SelectColor" component={SelectColor} options={defaultScreenOptions}/>
        <Stack.Screen name="SelectCountry" component={SelectCountry} options={defaultScreenOptions}/>
        <Stack.Screen name="SelectHairStyle" component={SelectHairStyle} options={defaultScreenOptions}/>
        <Stack.Screen name="SelectItems" component={SelectItems} options={{
          ...defaultScreenOptions,
          headerTitle: () => <SearchInput isFocused={true} />
        }}/>
        <Stack.Screen name="NewsFeed" component={NewsFeed} options={{
          headerTitle: () => <Text onPress={() => navigation.reset({index: 0, routes: [{name: "Search"}]})}>Search</Text>}}
        />
      </Stack.Navigator>
    </SearchProvider>
  )
}