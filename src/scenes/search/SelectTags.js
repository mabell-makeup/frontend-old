import React, {useContext, useEffect} from "react"
import {ScrollView} from "react-native"
import {searchStore, updateTmpConditions, fetchTrendTags, fetchTags} from "../../stores/searchStore"
import {ChipList} from "../../components/ChipList"
import {IconTextInput} from "../../components/IconTextInput"
import {TAG_SEARCH_PLACE_HOLDER} from "../../styles/constants"

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
    selected: false,
    onPress: () => {
      updateTmpConditions(dispatch, tmpConditions, {tags: [...tmpConditions.tags, tag.tag_name]})
      navigation.goBack()
    }
  }))

export const SelectTags = ({navigation}) => {
  const {dispatch, state: {tmpConditions, suggestionTags}} = useContext(searchStore)
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