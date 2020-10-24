/* eslint-disable react/display-name */
import React from "react"
import {List} from "../../components/List"
import {List as L} from "react-native-paper"
import {ScrollView} from "react-native"


const items = navigation => ([
  {title: "色から探す", left: props => <L.Icon {...props} icon="palette" />, onPress: () => navigation.navigate("SelectColor")},
  {title: "国から探す", left: props => <L.Icon {...props} icon="earth" />, onPress: () => navigation.navigate("SelectCountry")},
  {title: "ゴリラ", items: [
    {title: "マウンテンゴリラ", left: props => <L.Icon {...props} icon="star" />},
    {title: "ニシゴリラ"},
    {title: "ヒガシゴリラ"}
  ]}
])

export const SearchAll = ({navigation}) =>
  <ScrollView>
    <List items={items(navigation)} />
  </ScrollView>
