import React, {useContext} from "react"
import {ScrollView} from "react-native"
import {List} from "../../components/List"
import {Checkbox} from "react-native-paper"
import {searchStore, updateTmpConditionsItems, fetchPosts} from "../../stores/searchStore"

const createRows = (dispatch, items, tmpConditions) =>
  items.map(item => ({
    title: `${item.brand_name}-${item.item_name}`,
    key: item.item_id,
    // eslint-disable-next-line react/display-name
    right: () => <Checkbox status={tmpConditions.items.includes(item.item_id) ? "checked" : "unchecked"} color="#333" />,
    onPress: () => {
      updateTmpConditionsItems(dispatch, tmpConditions.items, item.item_id)
      fetchPosts(dispatch, tmpConditions)
    }
  }))


export const SelectKeywords = () => {
  const {dispatch, state: {suggestionItems, tmpConditions}} = useContext(searchStore)
  const rows = createRows(dispatch, suggestionItems, tmpConditions)

  return (
    <ScrollView>
      <List rows={rows} />
    </ScrollView>
  )
}