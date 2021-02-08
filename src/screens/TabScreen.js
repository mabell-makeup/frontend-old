import React, {useEffect, useContext} from "react"
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs"
import {HomeScreen} from "./HomeScreen"
import {SearchScreen} from "./SearchScreen"
import {IconButton} from "react-native-paper"
import {MyPageScreen} from "./MyPageScreen"
import {appStore, fetchMasterData} from "../stores/appStore"

const Tab = createMaterialBottomTabNavigator()

export const TabScreen = () => {
  const {dispatch} = useContext(appStore)

  useEffect(() => {fetchMasterData(dispatch)}, [])

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      inactiveColor="#777"
      barStyle={{backgroundColor: "#333", height: 80}}
      labeled={false}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{tabBarIcon: ({color}) => <IconButton icon="home" size={30} color={color} style={{margin: 0}} />}} />
      <Tab.Screen name="SearchScreen" component={SearchScreen} options={{tabBarIcon: ({color}) => <IconButton icon="magnify" size={30} color={color} style={{margin: 0}} />}} />
      <Tab.Screen name="MyPageScreen" component={MyPageScreen} options={{tabBarIcon: ({color}) => <IconButton icon="account-circle-outline" size={30} color={color} style={{margin: 0}} />}} />
    </Tab.Navigator>
  )
}