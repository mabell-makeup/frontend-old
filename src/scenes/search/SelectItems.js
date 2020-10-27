import React, {useContext} from "react"
import {ScrollView} from "react-native"
import {List} from "../../components/List"
import {Checkbox} from "react-native-paper"
import {searchStore, updateConditionsItems} from "../../stores/searchStore"

const createRows = (dispatch, items, selectedItems) =>
  items.map(item => ({
    title: `${item.brand_name}-${item.item_name}`,
    key: item.item_id,
    // eslint-disable-next-line react/display-name
    right: () => <Checkbox status={selectedItems.includes(item.item_id) ? "checked" : "unchecked"} color="#333" />,
    onPress: () => updateConditionsItems(dispatch, selectedItems, item.item_id)
  }))


export const SelectItems = () => {
  const {dispatch, state: {suggestionItems, conditions}} = useContext(searchStore)
  const rows = createRows(dispatch, suggestionItems, conditions.items)

  return (
    <ScrollView>
      <List rows={rows} />
    </ScrollView>
  )
}