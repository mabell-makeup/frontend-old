import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {WINDOW_HEIGHT} from "../styles/constants"
import {IconButton} from "react-native-paper"
import {StyleSheet, View} from "react-native"
import {PostDetail} from "../scenes/PostDetail"
import {UserPage} from "../scenes/UserPage"
import {Settings} from "../scenes/myPage/Settings"
import {UserInfoSetting} from "../scenes/myPage/UserInfoSetting"
import {TermsOfService} from "../scenes/myPage/TermsOfService"
import {PrivacyPolicy} from "../scenes/myPage/PrivacyPolicy"
import {NoticeSetting} from "../scenes/myPage/NoticeSetting"
import {ChangePassword} from "../scenes/myPage/ChangePassword"
import {ChangeMail} from "../scenes/myPage/ChangeMail"
import {SavedPosts} from "../scenes/myPage/SavedPosts"


const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  plusIcon: {
    marginRight: 0
  }
})

const Stack = createStackNavigator()

const HeaderRightIcons = ({navigation}) => {
  return (
    <View style={styles.headerRightContainer}>
      <IconButton icon="plus" size={30} mode="outlined" style={styles.plusIcon} onPress={() => navigation.navigate("PostScreen", {screen: "SelectImages"})} />
      <IconButton icon="menu" size={30} mode="outlined" onPress={() => navigation.navigate("Settings")} />
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

export const MyPageScreen = () => {

  return (
    <Stack.Navigator {...navigatorProps}>
      {/* eslint-disable-next-line react/display-name */}
      <Stack.Screen name="MyPage" component={UserPage} initialParams={{isMyPage: true}} options={({navigation}) => ({headerRight: () => <HeaderRightIcons navigation={navigation} />})} />
      <Stack.Screen name="UserHome" component={UserPage} />
      <Stack.Screen name="PostDetail" component={PostDetail} />
      <Stack.Screen name="UserInfoSetting" component={UserInfoSetting} />
      <Stack.Screen name="NoticeSetting" component={NoticeSetting} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="TermsOfService" component={TermsOfService} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ChangeMail" component={ChangeMail} />
      <Stack.Screen name="SavedPosts" component={SavedPosts} />
    </Stack.Navigator>
  )
}
