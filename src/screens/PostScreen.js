import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {SelectImages} from "../scenes/post/SelectImages"
import {PostProvider} from "../stores/postStore"
import {WINDOW_HEIGHT} from "../styles/constants"
import {SeletcTags} from "../scenes/post/SelectTags"
import {SelectProducts} from "../scenes/post/SelectProducts"

const Stack = createStackNavigator()

const navigatorProps = ({
  initialRouteName: "SelectImages",
  screenOptions: {
    headerStyle: {height: WINDOW_HEIGHT > 600 ? 100 : 70},
    headerTitleStyle: {width: "100%"},
    headerTitleAlign: "left"
  }
})

const PostScreenInner = () => {
  return (
    <Stack.Navigator {...navigatorProps}>
      <Stack.Screen name="SelectImages" component={SelectImages} />
      <Stack.Screen name="SelectProducts" component={SelectProducts} />
      <Stack.Screen name="SelectTags" component={SeletcTags} />
    </Stack.Navigator>
  )
}

export const PostScreen = () => <PostProvider><PostScreenInner /></PostProvider>
