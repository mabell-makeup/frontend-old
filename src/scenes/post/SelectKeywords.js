import React, {useContext, useEffect} from "react"
import {ScrollView} from "react-native"
import {Button, Text} from "react-native-paper"
import {appStore} from "../../stores/appStore"
import {searchStore, updateTmpConditions, fetchPosts} from "../../stores/searchStore"
import {ChipList} from "../../components/ChipList"

const styles = {
  container: {
    marginTop: 5
  },
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

const createRows = (keywords) =>
  keywords.map(keyword => ({
    label: `#${keyword}`,
    // eslint-disable-next-line react/display-name
    selected: false,
    onPress: () => {}
  }))

const handleCancel = (dispatch, navigation, tmpConditions, conditions) => {
  updateTmpConditions(dispatch, tmpConditions, {keywords: conditions.keywords || ""})
  navigation.goBack()
}

export const SelectKeywords = ({navigation}) => {
  const {dispatch, state: {suggestionKeywords}} = useContext(appStore)
  const rows = createRows(suggestionKeywords)

  useEffect(() => {
    // キャンセルボタンの動作を変更する
    // eslint-disable-next-line react/display-name
    // navigation.setOptions({headerRight: () => <Text onPress={() => handleCancel(dispatch, navigation, tmpConditions, conditions)}>キャンセル</Text>})    
  }, [])

  return (
    <ScrollView style={styles.container}>
      <ChipList items={rows} />
      <Button mode="contained" style={styles.button} onPress={() => navigation.goBack()}>絞り込む</Button>
    </ScrollView>
  )
}