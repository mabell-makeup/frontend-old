import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {WINDOW_HEIGHT} from "../styles/constants"
import {UserInfoSetting} from "../scenes/user/UserInfoSetting"

const Stack = createStackNavigator()

const navigatorProps = ({
  initialRouteName: "MyPage",
  screenOptions: {
    headerStyle: {height: WINDOW_HEIGHT > 600 ? 100 : 70},
    headerTitleStyle: {width: "70%"},
    headerTitleAlign: "left",
    headerBackTitleVisible: false
  }
})

export const UserScreen = () => {
  return (
    <Stack.Navigator {...navigatorProps}>
      <Stack.Screen name="UserInfoSetting" component={UserInfoSetting} />
    </Stack.Navigator>
  )
}
