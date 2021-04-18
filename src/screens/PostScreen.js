import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {SelectImages} from "../scenes/post/SelectImages"
import {WINDOW_HEIGHT} from "../styles/constants"
import {SelectTagsInner} from "../scenes/SelectTags"
import {SelectProductsInner} from "../scenes/SelectProducts"
import {updateTmpProducts, updateTmpTags} from "../stores/postStore"
import {useSelector} from "react-redux"

const Stack = createStackNavigator()

const navigatorProps = ({
  initialRouteName: "SelectImages",
  screenOptions: {
    headerStyle: {height: WINDOW_HEIGHT > 600 ? 100 : 70},
    headerTitleStyle: {width: "100%"},
    headerTitleAlign: "left",
    headerBackTitleVisible: false
  }
})

const SelectTags = props => {
  const tags = useSelector(({post: {tmpPost: {tags}}}) => tags)
  return <SelectTagsInner tags={tags} updateTmpTagsFunc={updateTmpTags} {...props} />
}

const SelectProducts = props => {
  const products = useSelector(({post: {tmpPost: {products}}}) => products)
  return <SelectProductsInner products={products} updateTmpProductsFunc={updateTmpProducts} {...props} />
}


export const PostScreen = () => {
  return (
    <Stack.Navigator {...navigatorProps}>
      <Stack.Screen name="SelectImages" component={SelectImages} />
      <Stack.Screen name="SelectProducts" component={SelectProducts} />
      <Stack.Screen name="SelectTags" component={SelectTags} />
    </Stack.Navigator>
  )
}
