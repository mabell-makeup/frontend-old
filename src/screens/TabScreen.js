/* eslint-disable react/display-name */
import React from "react"
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs"
import {SearchScreen} from "./SearchScreen"
import {IconButton} from "react-native-paper"
import {MyPageScreen} from "./MyPageScreen"
import {fetchMyPosts, fetchPostCount} from "../stores/authStore"
import {useDispatch, useSelector} from "react-redux"
import {NoticeScreen} from "./NoticeScreen"

const Tab = createMaterialBottomTabNavigator()

export const TabScreen = () => {
  const dispatch = useDispatch()
  const user_id = useSelector(({auth: {user: {user_id}}}) => user_id)

  return (
    <Tab.Navigator
      initialRouteName="SearchScreen"
      activeColor="#fff"
      inactiveColor="#777"
      barStyle={{backgroundColor: "#333", height: 80}}
      labeled={false}
    >
      {/* <Tab.Screen name="HomeScreen" component={HomeScreen} options={{tabBarIcon: ({color}) => <IconButton icon="home" size={30} color={color} style={{margin: 0}} />}} /> */}
      <Tab.Screen name="SearchScreen" component={SearchScreen} options={{tabBarIcon: ({color}) => <IconButton icon="magnify" size={30} color={color} style={{margin: 0}} />}} />
      <Tab.Screen name="NoticeScreen" component={NoticeScreen} options={{tabBarIcon: ({color}) => <IconButton icon="bell" size={28} color={color} style={{margin: 0}} />}} />
      <Tab.Screen name="MyPageScreen" component={MyPageScreen} options={{tabBarIcon: ({color}) => <IconButton icon="account-circle-outline" size={30} color={color} style={{margin: 0}} />}}
        listeners = {{tabPress: () => {
          fetchMyPosts(dispatch, user_id)
          fetchPostCount(dispatch, user_id)
        }}}
      />
    </Tab.Navigator>
  )
}