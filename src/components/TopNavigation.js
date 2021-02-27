import React from "react"
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs"

const Tab = createMaterialTopTabNavigator()

export const TopNavigation = ({items=[{label: "", routeName: "", component: React.Component}]}) => {
  return (
    <Tab.Navigator tabBarOptions={{scrollEnabled: false}}>
      {items.map(item => <Tab.Screen key={item.routeName} name={item.routeName} component={item.component} options={{tabBarLabel: item.label}} {...item} />)}
    </Tab.Navigator>
  )
}