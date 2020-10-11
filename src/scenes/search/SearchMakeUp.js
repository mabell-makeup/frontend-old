import React from "react"
import {List} from "../../components/List"
import {List as L} from "react-native-paper"
import {ScrollView} from "react-native"


const items = [
  {title: "犬", left: props => <L.Icon {...props} icon="dog" />},
  {title: "猫", left: props => <L.Icon {...props} icon="cat" />},
  {title: "ゴリラ", items: [
    {title: "マウンテンゴリラ", left: props => <L.Icon {...props} icon="star" />},
    {title: "ニシゴリラ"},
    {title: "ヒガシゴリラ"}
  ]}
]

export const SearchMakeUp = () => <ScrollView><List items={items} /></ScrollView>
