import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {MyPage} from "../scenes/user/MyPage"
import {WINDOW_HEIGHT} from "../styles/constants"

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
      <Stack.Screen name="MyPage" component={MyPage} />
    </Stack.Navigator>
  )
}
