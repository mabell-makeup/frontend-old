import React, {useContext} from "react"
import {ScrollView} from "react-native"
import {List} from "../../components/List"
import {Checkbox} from "react-native-paper"
import {searchStore, updateTmpConditionsKeywords, fetchPosts} from "../../stores/searchStore"

const createRows = (dispatch, keywords, tmpConditions) =>
  keywords.map(keyword => ({
    title: keyword,
    // eslint-disable-next-line react/display-name
    right: () => <Checkbox status={tmpConditions.keywords.split(/\s/).includes(keyword) ? "checked" : "unchecked"} color="#333" />,
    onPress: () => {
      updateTmpConditionsKeywords(dispatch, tmpConditions.keywords)
      fetchPosts(dispatch, tmpConditions)
    }
  }))


export const SelectKeywords = () => {
  const {dispatch, state: {suggestionKeywords, tmpConditions}} = useContext(searchStore)
  const rows = createRows(dispatch, suggestionKeywords, tmpConditions)

  return (
    <ScrollView>
      <List rows={rows} />
    </ScrollView>
  )
}