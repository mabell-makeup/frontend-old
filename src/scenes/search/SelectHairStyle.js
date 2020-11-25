import React, {useContext} from "react"
import {ScrollView} from "react-native"
import {List} from "../../components/List"
import {Checkbox} from "react-native-paper"
import {searchStore, updateTmpConditionsHairStyle, fetchPosts} from "../../stores/searchStore"


const hairStyles = [
  {title: "ベリーショート", key: "veryShort"},
  {title: "ショート",  key: "short"},
  {title: "ボブ",  key: "bob"},
  {title: "ミディアム", key: "medium"},
  {title: "セミロング", key: "semiLong"},
  {title: "ロング",  key: "long"},
  {title: "スーパーロング",  key: "superLong"}
]

const createRows = (hairStyles, dispatch, tmpConditions, navigation) =>
  hairStyles.map(hairStyle => ({
    title: hairStyle.title,
    key: hairStyle.key,
    // eslint-disable-next-line react/display-name
    right: () => <Checkbox status={hairStyle.key === tmpConditions.hairStyle ? "checked" : "unchecked"} color="#333" />,
    onPress: () => {
      updateTmpConditionsHairStyle(dispatch, hairStyle.key)
      fetchPosts(dispatch, tmpConditions)
      navigation.goBack()
    }
  }))

export const SelectHairStyle = ({navigation}) => {
  const {dispatch, state} = useContext(searchStore)
  const rows = createRows(hairStyles, dispatch, state.tmpConditions, navigation)

  return (
    <ScrollView>
      <List rows={rows} />
    </ScrollView>
  )
}