/* eslint-disable react/display-name */
import React, {useContext} from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {Search} from "../scenes/search/Search"
import {NewsFeed} from "../scenes/search/NewsFeed"
import {IconTextInput} from "../components/IconTextInput"
import {Text} from "react-native-paper"
import {fetchTags, SearchProvider, searchStore, updateTmpConditions} from "../stores/searchStore"
import {SelectTags} from "../scenes/search/SelectTags"
import {PostDetail} from "../scenes/search/PostDetail"
import {FakeInput} from "../components/FakeInput"
import {WINDOW_HEIGHT, KEYWORD_SEARCH_PLACE_HOLDER} from "../styles/constants"
import {UserHome} from "../scenes/search/UserHome"
import {PostDetailProvider} from "../stores/postDetailStore"
import {ItemDetail} from "../scenes/search/ItemDetail"

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

const handleInputKeywords = (dispatch, tmpConditions, text) => {
  updateTmpConditions(dispatch, tmpConditions, {tags: text}, false)
  fetchTags(dispatch, text.split(/\s/).pop())
}

// eslint-disable-next-line max-lines-per-function
const SearchScreenInner = ({navigation}) => {
  const defaultScreenOptions = createDefaultScreenOptions(navigation)
  const {dispatch, state: {tmpConditions}} = useContext(searchStore)

  return (
    <Stack.Navigator {...navigatorProps}>
      {/* SearchbarのonChangeで再レンダリングされないようにheaderTitleにわたすコンポーネントは無名関数でラップする */}
      <Stack.Screen name="Search" component={Search} options={{
        ...defaultScreenOptions
      }}/>
      <Stack.Screen name="SelectTags" component={SelectTags} options={{
        ...defaultScreenOptions,
        headerLeft: false,
        headerTitle: () => <IconTextInput placeholder={KEYWORD_SEARCH_PLACE_HOLDER} isFocused={true} defaultValue={tmpConditions.tags} onChangeText={text => handleInputKeywords(dispatch, tmpConditions, text)} />
      }}/>
      <Stack.Screen name="NewsFeed" component={NewsFeed} options={{
        ...defaultScreenOptions,
        headerRight: false,
        headerLeft: false,
        headerTitle: () => <FakeInput placeholder={KEYWORD_SEARCH_PLACE_HOLDER} navigation={navigation} value={tmpConditions.tags} style={{maxHeight: 35}} />,
        gestureDirection: "horizontal-inverted"
      }}/>
      <Stack.Screen name="PostDetail" component={PostDetail} options={{
        ...defaultScreenOptions,
        headerRight: false
      }} />
      <Stack.Screen name="ItemDetail" component={ItemDetail} options={defaultScreenOptions} />
      {/* TODO: UserScreenを設けて、UserHome, Follower, Followを入れる */}
      <Stack.Screen name="UserHome" component={UserHome} options={defaultScreenOptions} />
    </Stack.Navigator>
  )
}

export const SearchScreen = props => <SearchProvider><PostDetailProvider><SearchScreenInner {...props} /></PostDetailProvider></SearchProvider>