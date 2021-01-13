/* eslint-disable react/display-name */
import React, {useContext} from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {Search} from "../scenes/search/Search"
import {NewsFeed} from "../scenes/search/NewsFeed"
import {SearchInput} from "../components/SearchInput"
import {Text} from "react-native-paper"
import {SearchProvider, searchStore, updateSuggestionKeywords, updateTmpConditions} from "../stores/searchStore"
import {SelectKeywords} from "../scenes/search/SelectKeywords"
import {apiRequest} from "../helper/requestHelper"
import {Post} from "../scenes/search/Post"
import {FakeSearchInput} from "../components/FakeSearchInput"
import {WINDOW_HEIGHT} from "../styles/constants"

const Stack = createStackNavigator()

const createDefaultScreenOptions = navigation => ({
  headerRight: () => <Text onPress={() => navigation.reset({index: 0, routes: [{name: "NewsFeed"}]})}>キャンセル</Text>,
  headerRightContainerStyle: {marginRight: 5, padding: 0}
})

const navigatorProps = ({
  initialRouteName: "NewsFeed",
  screenOptions: {
    headerStyle: {height: WINDOW_HEIGHT > 600 ? 100 : 70},
    headerTitleStyle: {width: "70%"},
    headerTitleAlign: "left",
    headerBackTitleVisible: false
  }
})

const getSuggestionKeywords = (dispatch, text) => {
  const query = `{
    suggestionKeywords(keyword: "${text}", limit: 10) {
        keyword
      }
  }`
  const {data, error, loading} = apiRequest(query)
  return !loading && !error && updateSuggestionKeywords(dispatch, data.suggestionKeywords)
}

const handleInputKeywords = (dispatch, text) => {
  updateTmpConditions(dispatch, {keywords: text})
  getSuggestionKeywords(dispatch, text)
}


const SearchScreenInner = ({navigation}) => {
  const defaultScreenOptions = createDefaultScreenOptions(navigation)
  const {dispatch, state: {tmpConditions}} = useContext(searchStore)

  return (
    <Stack.Navigator {...navigatorProps}>
      {/* SearchbarのonChangeで再レンダリングされないようにheaderTitleにわたすコンポーネントは無名関数でラップする */}
      <Stack.Screen name="Search" component={Search} options={{
        ...defaultScreenOptions
      }}/>
      <Stack.Screen name="SelectKeywords" component={SelectKeywords} options={{
        ...defaultScreenOptions,
        headerLeft: false,
        headerTitle: () => <SearchInput isFocused={true} value={tmpConditions.keywords} onChangeText={text => handleInputKeywords(dispatch, text)} />
      }}/>
      <Stack.Screen name="NewsFeed" component={NewsFeed} options={{
        ...defaultScreenOptions,
        headerRight: false,
        headerLeft: false,
        headerTitle: () => <FakeSearchInput navigation={navigation} value={tmpConditions.keywords} />,
        gestureDirection: "horizontal-inverted"
      }}/>
      <Stack.Screen name="Post" component={Post} options={defaultScreenOptions} />
    </Stack.Navigator>
  )
}

export const SearchScreen = props => <SearchProvider><SearchScreenInner {...props} /></SearchProvider>