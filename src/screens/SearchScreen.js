/* eslint-disable react/display-name */
import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {Search} from "../scenes/search/Search"
import {NewsFeed} from "../scenes/search/NewsFeed"
import {Text} from "react-native-paper"
import {PostDetail} from "../scenes/search/PostDetail"
import {FakeInput} from "../components/FakeInput"
import {WINDOW_HEIGHT, TAG_SEARCH_PLACE_HOLDER} from "../styles/constants"
import {UserHome} from "../scenes/search/UserHome"
import {ItemDetail} from "../scenes/search/ItemDetail"
import {SelectProducts} from "../scenes/search/SelectProducts"
import {useSelector} from "react-redux"
import {SelectTagsInner} from "../scenes/SelectTags"
import {updateTmpTags} from "../stores/searchStore"

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

const SelectTags = props => {
  const {tags} = useSelector(({post: {tmpPost: {tags}}}) => ({tags}))

  return <SelectTagsInner tags={tags} updateTmpTagsFunc={updateTmpTags} {...props} />
}

// eslint-disable-next-line max-lines-per-function
export const SearchScreen = ({navigation}) => {
  const defaultScreenOptions = createDefaultScreenOptions(navigation)
  const tmpConditions = useSelector(({search: {tmpConditions}}) => tmpConditions)

  return (
    <Stack.Navigator {...navigatorProps}>
      <Stack.Screen name="Search" component={Search} options={defaultScreenOptions}/>
      <Stack.Screen name="SelectTags" component={SelectTags} />
      <Stack.Screen name="SelectProducts" component={SelectProducts} />
      <Stack.Screen name="NewsFeed" component={NewsFeed} options={{
        ...defaultScreenOptions,
        headerRight: false,
        headerLeft: false,
        headerTitle: () => <FakeInput placeholder={TAG_SEARCH_PLACE_HOLDER} navigation={navigation} value={tmpConditions.tags.join(" ")} style={{maxHeight: 35}} />,
        gestureDirection: "horizontal-inverted"
      }}/>
      <Stack.Screen name="PostDetail" component={PostDetail} options={{
        ...defaultScreenOptions,
        headerRight: false
      }} />
      <Stack.Screen name="ItemDetail" component={ItemDetail} options={defaultScreenOptions} />
      {/* TODO: UserScreenを設けて、UserHome, Follower, Followを入れる */}
      <Stack.Screen name="UserHome" component={UserHome} options={{
        ...defaultScreenOptions,
        headerRight: false
      }} />
    </Stack.Navigator>
  )
}
