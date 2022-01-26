/* eslint-disable react/display-name */
import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {Search} from "../scenes/search/Search"
import {NewsFeed} from "../scenes/search/NewsFeed"
import {Text} from "react-native-paper"
import {PostDetail} from "../scenes/PostDetail"
import {FakeInput} from "../components/FakeInput"
import {WINDOW_HEIGHT, TAG_SEARCH_PLACE_HOLDER} from "../styles/constants"
import {UserPage} from "../scenes/UserPage"
import {ProductDetail} from "../scenes/search/ProductDetail"
import {useDispatch, useSelector} from "react-redux"
import {SelectTagsInner} from "../scenes/SelectTags"
import {resetTmpConditions, updateTmpProducts, updateTmpTags} from "../stores/searchStore"
import {SelectProductsInner} from "../scenes/SelectProducts"
import {SearchResult} from "../scenes/search/SearchResult"
import {Comments} from "../scenes/Comments"

const Stack = createStackNavigator()

const defaultScreenOptions = {
  headerRightContainerStyle: {marginRight: 5, padding: 0}
}

const navigatorProps = ({
  initialRouteName: "NewsFeed",
  screenOptions: {
    headerStyle: {height: WINDOW_HEIGHT > 600 ? 100 : 70},
    headerTitleStyle: {width: "100%"},
    headerTitleAlign: "left",
    headerBackTitleVisible: false
  }
})

const SelectTags = props => {
  const tags = useSelector(({search: {tmpConditions: {tags}}}) => tags)
  return <SelectTagsInner tags={tags} updateTmpTagsFunc={updateTmpTags} {...props} />
}

const SelectProducts = props => {
  const products = useSelector(({search: {tmpConditions: {products}}}) => products)
  return <SelectProductsInner products={products} updateTmpProductsFunc={updateTmpProducts} {...props} />
}


// eslint-disable-next-line max-lines-per-function
export const SearchScreen = ({navigation}) => {
  const dispatch = useDispatch()
  const tmpConditions = useSelector(({search: {tmpConditions}}) => tmpConditions)

  return (
    <Stack.Navigator {...navigatorProps}>
      <Stack.Screen name="Search" component={Search} options={{
        ...defaultScreenOptions,
        headerRight: () => <Text onPress={() => resetTmpConditions(dispatch)}>条件クリア</Text>,
        title: "検索"
      }}/>
      <Stack.Screen name="SelectTags" component={SelectTags} />
      <Stack.Screen name="SelectProducts" component={SelectProducts} />
      <Stack.Screen name="NewsFeed" component={NewsFeed} options={{
        ...defaultScreenOptions,
        headerRight: false,
        headerLeft: false,
        headerTitleContainerStyle: { 
          width: "100%"
        },
        headerTitle: () => <FakeInput placeholder={TAG_SEARCH_PLACE_HOLDER} navigation={navigation} value={tmpConditions.tags.join(" ")} style={{maxHeight: 35}} />,
        gestureDirection: "horizontal-inverted"
      }}/>
      <Stack.Screen name="PostDetail" component={PostDetail} options={{
        ...defaultScreenOptions,
        headerRight: false,
        title:"投稿"
      }} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} options={defaultScreenOptions} />
      <Stack.Screen name="UserHome" component={UserPage} options={{
        ...defaultScreenOptions,
        headerRight: false
      }} />
      <Stack.Screen name="SearchResult" component={SearchResult} options={{
        ...defaultScreenOptions,
        headerStyle: {
          shadowRadius: 0,
          shadowOffset: {
            height: 0
          }
        },
        title:"検索結果"
      }} />
      <Stack.Screen name="Comments" component={Comments} options={defaultScreenOptions} />
    </Stack.Navigator>
  )
}
