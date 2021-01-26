import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {Post} from "../scenes/post/Post"

const Stack = createStackNavigator()

const navigatorProps = ({
  initialRouteName: "Post",
  screenOptions: {
    headerShown: false
  }
})

export const PostScreen = () => {
  return (
    <Stack.Navigator {...navigatorProps}>
      <Stack.Screen name="Post" component={Post} />
    </Stack.Navigator>
  )
}
