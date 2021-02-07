import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {MyPage} from "../scenes/user/MyPage"
import {WINDOW_HEIGHT} from "../styles/constants"
import {IconButton} from "react-native-paper"
import {View} from "react-native"
import {UserInfoSetting} from "../scenes/user/UserInfoSetting"

const Stack = createStackNavigator()

const HeaderRightIcons = ({navigation}) => {
  return (
    <View style={{flexDirection: "row", alignItems: "center", marginRight: 5}}>
      <IconButton icon="plus" size={30} mode="outlined" onPress={() => navigation.navigate("PostScreen", {screen: "SelectImages"})} />
      <IconButton icon="account-edit" size={30} mode="outlined" onPress={() => navigation.navigate("UserInfoSetting")} />
    </View>
  )
}

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
      {/* eslint-disable-next-line react/display-name */}
      <Stack.Screen name="MyPage" component={MyPage} options={({navigation}) => ({headerRight: () => <HeaderRightIcons navigation={navigation} />})} />
      <Stack.Screen name="UserInfoSetting" component={UserInfoSetting} />
    </Stack.Navigator>
  )
}
