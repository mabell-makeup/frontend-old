import React, {useContext} from "react"
import {ScrollView} from "react-native"
import {searchStore, updateTmpConditionsKeywords, fetchPosts} from "../../stores/searchStore"
import {ChipList} from "../../components/ChipList"

const chipAction = (preKeywords, keyword) => {
  const tmp = preKeywords.split(/\s/)
  tmp.pop() // 入力途中のキーワードを削除する
  return tmp.concat([keyword]).join(" ") + " "
}

const createRows = (dispatch, keywords, tmpConditions) =>
  keywords.map(keyword => ({
    label: `#${keyword}`,
    // eslint-disable-next-line react/display-name
    selected: tmpConditions.keywords.split(/\s/).includes(keyword),
    onPress: () => {
      updateTmpConditionsKeywords(dispatch, chipAction(tmpConditions.keywords, keyword))
      fetchPosts(dispatch, tmpConditions)
    }
  }))


export const SelectKeywords = () => {
  const {dispatch, state: {suggestionKeywords, tmpConditions}} = useContext(searchStore)
  const rows = createRows(dispatch, suggestionKeywords, tmpConditions)

  return (
    <ScrollView>
      <ChipList items={rows} />
    </ScrollView>
  )
}