import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {WINDOW_HEIGHT} from "../styles/constants"
import {Notice} from "../scenes/notice/Notice"

const Stack = createStackNavigator()

const navigatorProps = ({
  initialRouteName: "Notice",
  screenOptions: {
    headerStyle: {height: WINDOW_HEIGHT > 600 ? 100 : 70},
    headerTitleStyle: {width: "100%"},
    headerTitleAlign: "left",
    headerBackTitleVisible: false
  }
})

export const NoticeScreen = () => {
  return (
    <Stack.Navigator {...navigatorProps}>
      <Stack.Screen name="Notice" component={Notice} options={{title: 'お知らせ'}}/>
    </Stack.Navigator>
  )
}
