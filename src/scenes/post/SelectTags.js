import React, {useContext, useEffect} from "react"
import {ScrollView} from "react-native"
import {Button, Text} from "react-native-paper"
import {ChipList} from "../../components/ChipList"
import {fetchTrendTags, postStore, updateTmpTags} from "../../stores/postStore"
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

const createRows = (dispatch, tags, navigation) =>
  tags.map(tag => ({
    label: `#${tag.tag_name}`,
    selected: false,
    onPress: () => {
      updateTmpTags(dispatch, [tag.tag_name])
      navigation.goBack()
    }
  }))

export const SeletcTags = ({navigation}) => {
  const {dispatch, state: {suggestionTags, tmpPost: {tags}}} = useContext(postStore)
  const rows = createRows(dispatch, suggestionTags, navigation)

  useEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back",
      // eslint-disable-next-line react/display-name
      headerTitle: () => <IconTextInput placeholder={KEYWORD_SEARCH_PLACE_HOLDER} defaultValue={tags} onChangeText={text => {}} />
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