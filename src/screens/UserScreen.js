import React from "react"
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
      <IconButton icon="menu" size={30} mode="outlined" onPress={() => {}} />
    </View>
  )
}

const navigatorProps = ({
  initialRouteName: "MyPage",
  screenOptions: ({navigation}) => ({
    headerStyle: {height: WINDOW_HEIGHT > 600 ? 100 : 70},
    headerTitleStyle: {width: "70%"},
    headerTitleAlign: "left",
    headerBackTitleVisible: false,
    // eslint-disable-next-line react/display-name
    headerRight: () => <HeaderRightIcons navigation={navigation} />
  })
})

export const UserScreen = () => {
  return (
    <Stack.Navigator {...navigatorProps}>
      <Stack.Screen name="MyPage" component={MyPage} />
    </Stack.Navigator>
  )
}
