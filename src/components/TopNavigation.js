import React from "react"
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs"
import {secondary} from "../styles/colors"

const Tab = createMaterialTopTabNavigator()

export const TopNavigation = ({items=[{label: "", routeName: "", component: React.Component}], initialRouteName}) => {
  return (
    <Tab.Navigator tabBarOptions={{scrollEnabled: false, indicatorStyle: {backgroundColor: secondary}}} initialRouteName={initialRouteName}>
      {items.map(item => <Tab.Screen key={item.routeName} name={item.routeName} component={item.component} options={{tabBarLabel: item.label}} {...item} />)}
    </Tab.Navigator>
  )
}