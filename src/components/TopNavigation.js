import React from "react"
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs"

const Tab = createMaterialTopTabNavigator()

export const TopNavigation = ({screens=[{name: "", component: React.Component}]}) => {
  return (
    <Tab.Navigator>
      {/* eslint-disable-next-line react/jsx-key */}
      {screens.map(screen => <Tab.Screen name={screen.name} component={screen.component} />)}
    </Tab.Navigator>
  )
}