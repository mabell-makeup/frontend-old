import React from "react"
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs"

const Tab = createMaterialTopTabNavigator()

export const TopNavigation = ({screens=[{label: "", routeName: "", component: React.Component}]}) => {
  return (
    <Tab.Navigator tabBarOptions={{scrollEnabled: true}}>
      {/* eslint-disable-next-line react/jsx-key */}
      {screens.map(screen => <Tab.Screen name={screen.routeName} component={screen.component} options={{tabBarLabel: screen.label}} />)}
    </Tab.Navigator>
  )
}