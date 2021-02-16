/* eslint-disable react/display-name */
import React, {useContext, useEffect} from "react"
import {List} from "../../components/List"
import {Button} from "react-native-paper"
import {ScrollView, View} from "react-native"
import {searchStore, updateConditions, updateSearchResult, initialState, updateTmpConditions, fetchPosts, fetchTrendTags} from "../../stores/searchStore"
import {ColorPaletteInput} from "./ColorPaletteInput"
import {CountryInput} from "../../components/CountryInput"
import {PersonalColorInput} from "../../components/PersonalColorInput"
import {FaceTypeInput} from "../../components/FaceTypeInput"
import {MakeUpCategoryInput} from "./MakeUpCategoryInput"
import {FakeInput} from "../../components/FakeInput"
import {isEqual} from "../../helper/storeHelper"
import {TAG_SEARCH_PLACE_HOLDER} from "../../styles/constants"
import {SkinTypeInput} from "../../components/SkinTypeInput"
import {ChipList} from "../../components/ChipList"

const styles = {
  button: {
    height: 50,
    margin: 5,
    justifyContent: "center"
  },
  buttonLabel: {
    fontSize: 16
  },
  buttonContentStyle: {
    height: "100%"
  },
  accordion: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1
  },
  accordionTitle: {
    fontWeight: "bold"
  },
  FakeInput: {
    marginTop: 10,
    maxHeight: 35
  }
}

const handlePress = (dispatch, navigation) => () => {
  updateSearchResult(dispatch)
  updateConditions(dispatch)
  navigation.navigate("NewsFeed", {screen: "Women"})
}

const createRows = conditions => conditions.map(({title, inner}) => 
  ({title: title, rows: [inner], expanded: true, style: styles.accordion, titleStyle: styles.accordionTitle, theme:{colors: {primary:"#000"}}})
)

const createTags = (dispatch, tmpConditions, navigation, tags) => tags.map(tag => ({
  label: `#${tag.tag_name}`,
  onPress: () => {
    updateTmpConditions(dispatch, tmpConditions, {tags: tag.tag_name + " "})
    fetchPosts(dispatch, tmpConditions)
    navigation.navigate("SelectTags")
  }
}))

// eslint-disable-next-line max-lines-per-function
export const SelectConditions = ({navigation}) => {
  const {dispatch, state: {tmpConditions, suggestionTags}} = useContext(searchStore)

  useEffect(() => {fetchTrendTags(dispatch)}, [])
  const trendTags = createTags(dispatch, tmpConditions, navigation, suggestionTags)
  
  // TODO: 後でコンポーネントの外に出す
  // TODO: Accordionをやめるので、isExpanded, setIsExpandedを使わない。
  const conditions = [
    {title: "カテゴリで絞り込む", inner: <MakeUpCategoryInput key="makeUpCategory" />},
    {title: "色で絞り込む", inner: <ColorPaletteInput key="color" />},
    {title: "国で絞り込む", inner: <CountryInput key="country" />},
    {title: "パーソナルカラーで絞り込む", inner: <PersonalColorInput key="personalColor" />},
    {title: "顔型で絞り込む", inner: <FaceTypeInput key="faceType" />},
    {title: "肌タイプで絞り込む", inner: <SkinTypeInput key="skinType" />},
    {
      title: "タグで絞り込む",
      inner:
        // eslint-disable-next-line react/jsx-indent
        <View key="keywords">
          <FakeInput placeholder={TAG_SEARCH_PLACE_HOLDER} value={tmpConditions.keywords} navigation={navigation} linkTo="SelectTags" key="keyword" style={styles.FakeInput} />
          <ChipList items={trendTags} />
        </View>
    }
  ]
  
  const rows = createRows(conditions)

  return (
    <>
      <ScrollView>
        <List rows={rows} />
      </ScrollView>
      <Button mode="contained" style={styles.button} labelStyle={styles.buttonLabel} contentStyle={styles.buttonContentStyle} onPress={handlePress(dispatch, navigation)} disabled={isEqual(initialState.tmpConditions, tmpConditions)}>絞り込む</Button>
    </>
  )
}