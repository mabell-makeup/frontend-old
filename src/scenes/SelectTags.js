import React, {useState, useEffect} from "react"
import {ScrollView} from "react-native"
import {Button} from "react-native-paper"
import {ChipList} from "../components/ChipList"
import {TAG_SEARCH_PLACE_HOLDER} from "../styles/constants"
import {IconTextInput} from "../components/IconTextInput"
import {useDispatch, useSelector} from "react-redux"
import {createTag, fetchTags, fetchTrendTags} from "../stores/appStore"

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

const createRows = (dispatch, preTags, tags, navigation, updateTmpTagsFunc) =>
  tags.map(tag => ({
    label: `#${tag.tag_name}`,
    selected: preTags.includes(tag.tag_name),
    onPress: () => {
      updateTmpTagsFunc(dispatch, preTags, tag.tag_name)
      navigation.goBack()
    }
  }))

const onPress = (dispatch, preTags, text, navigation, suggestionTags, updateTmpTagsFunc) => () => {
  suggestionTags.map(tag => tag.tag_name).includes(text) ? updateTmpTagsFunc(dispatch, preTags, text) : createTag(dispatch, preTags, text, () => updateTmpTagsFunc(dispatch, preTags, text))
  navigation.goBack()
}

const onChangeText = (dispatch, setText) => text => {
  setText(text)
  fetchTags(dispatch, text)
}

export const SelectTagsInner = ({navigation, tags, updateTmpTagsFunc}) => {
  const dispatch = useDispatch()
  const {suggestionTags} = useSelector(({app: {suggestionTags}}) => ({suggestionTags, tags}))
  const rows = createRows(dispatch, tags, suggestionTags, navigation, updateTmpTagsFunc)
  const [text, setText] = useState("")

  useEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back",
      // eslint-disable-next-line react/display-name
      headerTitle: () => <IconTextInput placeholder={TAG_SEARCH_PLACE_HOLDER} onChangeText={onChangeText(dispatch, setText)} />
    })
    fetchTrendTags(dispatch)
  }, [dispatch])

  return (
    <ScrollView style={styles.container}>
      <ChipList items={rows} />
      <Button mode="contained" style={styles.button} contentStyle={styles.buttonContentStyle} onPress={onPress(dispatch, tags, text, navigation, suggestionTags, updateTmpTagsFunc)}>タグを追加</Button>
    </ScrollView>
  )
}