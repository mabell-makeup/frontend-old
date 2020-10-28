import React, {useContext} from "react"
import {ScrollView} from "react-native"
import {List} from "../../components/List"
import {Checkbox} from "react-native-paper"
import {searchStore, updateConditionsItems, fetchPosts} from "../../stores/searchStore"

const createRows = (dispatch, items, conditions) =>
  items.map(item => ({
    title: `${item.brand_name}-${item.item_name}`,
    key: item.item_id,
    // eslint-disable-next-line react/display-name
    right: () => <Checkbox status={conditions.items.includes(item.item_id) ? "checked" : "unchecked"} color="#333" />,
    onPress: () => {
      updateConditionsItems(dispatch, conditions.items, item.item_id)
      fetchPosts(dispatch, conditions)
    }
  }))


export const SelectItems = () => {
  const {dispatch, state: {suggestionItems, conditions}} = useContext(searchStore)
  const rows = createRows(dispatch, suggestionItems, conditions)

  return (
    <ScrollView>
      <List rows={rows} />
    </ScrollView>
  )
}