import React, {useContext} from "react"
import {List} from "../../components/List"
import {List as L, Button, Text} from "react-native-paper"
import {ScrollView} from "react-native"
import {searchStore} from "../../stores/searchStore"


const items = [
  {title: "犬", left: props => <L.Icon {...props} icon="dog" />},
  {title: "猫", left: props => <L.Icon {...props} icon="cat" />},
  {title: "ゴリラ", items: [
    {title: "マウンテンゴリラ", left: props => <L.Icon {...props} icon="star" />},
    {title: "ニシゴリラ"},
    {title: "ヒガシゴリラ"}
  ]}
]

export const SearchMakeUp = () => {
  const {dispatch, state: {useUserInfo}} = useContext(searchStore)

  return (
    <ScrollView>
      <List items={items} />
      <Button icon="star" mode="contaied" onPress={() => dispatch({type: "UPDATE_USE_USER_INFO", payload: !useUserInfo})} />
      <Text>ユーザー情報を絞り込み条件に?? {useUserInfo ? "加える" : "加えない"}</Text>
    </ScrollView>
  )
}
