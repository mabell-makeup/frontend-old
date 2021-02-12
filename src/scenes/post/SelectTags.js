import React, {useContext, useEffect} from "react"
import {ScrollView} from "react-native"
import {Button, Text} from "react-native-paper"
import {ChipList} from "../../components/ChipList"
import {fetchTrendTags, postStore} from "../../stores/postStore"
import {KEYWORD_SEARCH_PLACE_HOLDER} from "../../styles/constants"
import {IconTextInput} from "../../components/IconTextInput"

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

const createRows = (tags) =>
  tags.map(tag => ({
    label: `#${tag.tag_name}`,
    selected: false,
    onPress: () => {}
  }))

export const SeletcTags = ({navigation}) => {
  const {dispatch, state: {suggestionTags, tmpPost: {tags}}} = useContext(postStore)
  const rows = createRows(suggestionTags)

  useEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back",
      // eslint-disable-next-line react/display-name
      headerTitle: () => <IconTextInput placeholder={KEYWORD_SEARCH_PLACE_HOLDER} isFocused={true} defaultValue={tags} onChangeText={text => {}} />
    })
    fetchTrendTags(dispatch)
  }, [dispatch])

  return (
    <ScrollView style={styles.container}>
      <ChipList items={rows} />
      <Button mode="contained" style={styles.button} onPress={() => navigation.goBack()}>タグを追加</Button>
    </ScrollView>
  )
}