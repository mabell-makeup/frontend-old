import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {Post} from "../scenes/post/Post"
import {ImagePicker} from "../components/ImagePicker"

const Stack = createStackNavigator()

const navigatorProps = ({
  initialRouteName: "Post"
})

export const PostScreen = () => {
  return (
    <Stack.Navigator {...navigatorProps}>
      <Stack.Screen name="Post" component={Post} />
      <Stack.Screen name="ImagePicker" component={ImagePicker} />
    </Stack.Navigator>
  )
}
