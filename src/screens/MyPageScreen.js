import React, {useEffect} from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {MyPage} from "../scenes/user/MyPage"
import {WINDOW_HEIGHT} from "../styles/constants"
import {IconButton} from "react-native-paper"
import {View} from "react-native"

const Stack = createStackNavigator()

const HeaderRightIcons = ({navigation}) => {
  return (
    <View style={{flexDirection: "row", alignItems: "center", marginRight: 5}}>
      <IconButton icon="plus" size={30} mode="outlined" onPress={() => navigation.navigate("PostScreen", {screen: "SelectImages"})} />
      <IconButton icon="account" size={30} mode="outlined" onPress={() => navigation.navigate("UserScreen", {screen: "UserInfoSetting"})} />
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

export const MyPageScreen = ({navigation}) => {
  useEffect(() => {
    
  })

  return (
    <Stack.Navigator {...navigatorProps}>
      {/* eslint-disable-next-line react/display-name */}
      <Stack.Screen name="MyPage" component={MyPage} options={({navigation}) => ({headerRight: () => <HeaderRightIcons navigation={navigation} />})} />
    </Stack.Navigator>
  )
}
