/* eslint-disable react/display-name */
import React from "react"
import {List} from "../../components/List"
import {List as L} from "react-native-paper"
import {ScrollView} from "react-native"

const createItems = (columns, navigation) => columns.map(column => ({
  title: column.title,
  onPress: () => navigation.navigate(column.navigateTo),
  right: props => <L.Icon {...props} icon="chevron-right" />
}))

const columns = [
  {title: "色から探す", navigateTo: "SelectColor"},
  {title: "国から探す", navigateTo: "SelectCountry"},
  {title: "髪型から探す", navigateTo: "SelectHairStyle"},
  {title: "使用アイテムから探す", navigateTo: "SelectItems"}
]

export const SelectConditions = ({navigation}) => {
  const items = createItems(columns, navigation)

  return (
    <ScrollView>
      <List items={items} />
    </ScrollView>
  )
}