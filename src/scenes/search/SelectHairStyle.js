import React, {useContext} from "react"
import {ScrollView} from "react-native"
import {List} from "../../components/List"
import {Checkbox} from "react-native-paper"
import {searchStore, updateConditionsHairStyle} from "../../stores/searchStore"


const hairStyles = [
  {title: "ベリーショート", key: "korea"},
  {title: "ショート",  key: "china"},
  {title: "ボブ",  key: "america"},
  {title: "ミディアム", key: "other"},
  {title: "セミロング", key: "korea"},
  {title: "ロング",  key: "china"},
  {title: "スーパーロング",  key: "america"}
]

const createItems = (hairStyles, dispatch) => selectedHairStyle => 
  hairStyles.map(hairStyle => ({
    title: hairStyle.title,
    key: hairStyle.key,
    // eslint-disable-next-line react/display-name
    // right: () => <Checkbox status={hairStyle.key === selectedHairStyle ? "checked" : "unchecked"} color="#333" />,
    // onPress: () => updateConditionsHairStyle(dispatch, hairStyle.key)
  }))

export const SelectHairStyle = () => {
  // const {dispatch, state} = useContext(searchStore)
  const items = createItems(hairStyles/* , dispatch */)

  return (
    <ScrollView>
      <List items={items()} />
    </ScrollView>
  )
}