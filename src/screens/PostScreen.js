import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {SelectImages} from "../components/SelectImages"
import {SelectTags} from "../scenes/post/SelectTags"
import {PostProvider} from "../stores/postStore"
import {SelectItems} from "../scenes/post/SelectItems"
import {SelectKeywords} from "../scenes/post/SelectKeywords"

const Stack = createStackNavigator()

const navigatorProps = ({
  initialRouteName: "SelectImages"
})

export const PostScreen = () => {
  return (
    <PostProvider>
      <Stack.Navigator {...navigatorProps}>
        <Stack.Screen name="SelectImages" component={SelectImages} />
        <Stack.Screen name="SelectTags" component={SelectTags} />
        <Stack.Screen name="SelectItems" component={SelectItems} />
        <Stack.Screen name="SelectKeywords" component={SelectKeywords} />
      </Stack.Navigator>
    </PostProvider>
  )
}
