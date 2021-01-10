import React, {useContext} from "react"
import {ScrollView} from "react-native"
import {Button} from "react-native-paper"
import {searchStore, updateTmpConditionsKeywords, fetchPosts} from "../../stores/searchStore"
import {ChipList} from "../../components/ChipList"

const styles = {
  button: {
    height: 50,
    marginHorizontal: 5,
    marginTop: 30,
    justifyContent: "center"
  }
}

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

export const SelectKeywords = ({navigation}) => {
  const {dispatch, state: {suggestionKeywords, tmpConditions}} = useContext(searchStore)
  const rows = createRows(dispatch, suggestionKeywords, tmpConditions)

  return (
    <ScrollView>
      <ChipList items={rows} />
      <Button mode="contained" style={styles.button} onPress={() => navigation.goBack()}>絞り込む</Button>
    </ScrollView>
  )
}