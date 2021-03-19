import React, {useState, useEffect} from "react"
import {ScrollView} from "react-native"
import {Button} from "react-native-paper"
import {ChipList} from "../../components/ChipList"
import {createTag, fetchTags, fetchTrendTags, updateTmpTags} from "../../stores/postStore"
import {TAG_SEARCH_PLACE_HOLDER} from "../../styles/constants"
import {IconTextInput} from "../../components/IconTextInput"
import {useDispatch, useSelector} from "react-redux"

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

const createRows = (dispatch, preTags, tags, navigation) =>
  tags.map(tag => ({
    label: `#${tag.tag_name}`,
    selected: preTags.includes(tag.tag_name),
    onPress: () => {
      updateTmpTags(dispatch, preTags, tag.tag_name)
      navigation.goBack()
    }
  }))

const onPress = (dispatch, preTags, text, navigation, suggestionTags) => () => {
  suggestionTags.map(tag => tag.tag_name).includes(text) ? updateTmpTags(dispatch, preTags, text) : createTag(dispatch, preTags, text)
  navigation.goBack()
}

const onChangeText = (dispatch, setText) => text => {
  setText(text)
  fetchTags(dispatch, text)
}

export const SelectTags = ({navigation}) => {
  const dispatch = useDispatch()
  const {suggestionTags, tags} = useSelector(({post: {suggestionTags, tmpPost: {tags}}}) => ({suggestionTags, tags}))
  const rows = createRows(dispatch, tags, suggestionTags, navigation)
  const [text, setText] = useState("")

  useEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back",
      // eslint-disable-next-line react/display-name
      headerTitle: () => <IconTextInput placeholder={TAG_SEARCH_PLACE_HOLDER} defaultValue={tags} onChangeText={onChangeText(dispatch, setText)} />
    })
    fetchTrendTags(dispatch)
  }, [dispatch])

  return (
    <ScrollView style={styles.container}>
      <ChipList items={rows} />
      <Button mode="contained" style={styles.button} contentStyle={styles.buttonContentStyle} onPress={onPress(dispatch, tags, text, navigation, suggestionTags)}>タグを追加</Button>
    </ScrollView>
  )
}