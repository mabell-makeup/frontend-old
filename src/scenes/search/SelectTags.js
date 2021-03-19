import React, {useEffect} from "react"
import {ScrollView} from "react-native"
import {fetchTrendTags, fetchTags, updateTmpTags} from "../../stores/searchStore"
import {ChipList} from "../../components/ChipList"
import {IconTextInput} from "../../components/IconTextInput"
import {TAG_SEARCH_PLACE_HOLDER} from "../../styles/constants"
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

const createRows = (dispatch, tags, tmpConditions, navigation) =>
  tags.map(tag => ({
    label: `#${tag.tag_name}`,
    selected: tmpConditions.tags.includes(tag.tag_name),
    onPress: () => {
      updateTmpTags(dispatch, tmpConditions.tags, tag.tag_name)
      navigation.goBack()
    }
  }))

export const SelectTags = ({navigation}) => {
  const dispatch = useDispatch()
  const {tmpConditions, suggestionTags} = useSelector(({search: {tmpConditions, suggestionTags}}) => ({tmpConditions, suggestionTags}))
  const rows = createRows(dispatch, suggestionTags, tmpConditions, navigation)

  useEffect(() => {
    // キャンセルボタンの動作を変更する
    navigation.setOptions({
      headerBackTitleVisible: true,
      headerBackTitle: "Back",
      // eslint-disable-next-line react/display-name
      headerTitle: () => <IconTextInput placeholder={TAG_SEARCH_PLACE_HOLDER} onChangeText={text => fetchTags(dispatch, text)} />
    })
    fetchTrendTags(dispatch)
  }, [])

  return (
    <ScrollView style={styles.container}>
      <ChipList items={rows} />
    </ScrollView>
  )
}