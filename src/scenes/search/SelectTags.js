import React, {useContext, useEffect} from "react"
import {ScrollView} from "react-native"
import {Button, Text} from "react-native-paper"
import {appStore} from "../../stores/appStore"
import {searchStore, updateTmpConditions, fetchPosts, fetchTrendTags} from "../../stores/searchStore"
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
  },
  buttonContentStyle: {
    height: "100%"
  }
}

const chipAction = (preTags, tag) => {
  const tmp = preTags.split(/\s/)
  tmp.pop() // 入力途中のキーワードを削除する
  return tmp.concat([tag]).join(" ") + " "
}

const createRows = (dispatch, tags, tmpConditions) =>
  tags.map(tag => ({
    label: `#${tag.tag_name}`,
    selected: false,
    onPress: () => {
      updateTmpConditions(dispatch, tmpConditions, {tags: chipAction(tmpConditions.tags, tag.tag_name)})
      fetchPosts(dispatch, tmpConditions)
    }
  }))

const handleCancel = (dispatch, navigation, tmpConditions, conditions) => {
  updateTmpConditions(dispatch, tmpConditions, {tags: conditions.tags || ""})
  navigation.goBack()
}

export const SelectTags = ({navigation}) => {
  const {dispatch, state: {tmpConditions, conditions, suggestionTags}} = useContext(searchStore)
  const rows = createRows(dispatch, suggestionTags, tmpConditions)

  useEffect(() => {
    // キャンセルボタンの動作を変更する
    // eslint-disable-next-line react/display-name
    navigation.setOptions({headerRight: () => <Text onPress={() => handleCancel(dispatch, navigation, tmpConditions, conditions)}>キャンセル</Text>})
    fetchTrendTags(dispatch)
  }, [])

  return (
    <ScrollView style={styles.container}>
      <ChipList items={rows} />
      <Button mode="contained" style={styles.button} contentStyle={styles.buttonContentStyle} onPress={() => navigation.goBack()}>絞り込む</Button>
    </ScrollView>
  )
}