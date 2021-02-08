/* eslint-disable react/display-name */
import React, {useContext} from "react"
import {List} from "../../components/List"
import {Button} from "react-native-paper"
import {ScrollView, View} from "react-native"
import {searchStore, updateConditions, updateSearchResult, initialState, updateTmpConditions, fetchPosts} from "../../stores/searchStore"
import {ColorPaletteInput} from "../../components/ColorPaletteInput"
import {CountryInput} from "../../components/CountryInput"
import {PersonalColorInput} from "../../components/PersonalColorInput"
import {FaceTypeInput} from "../../components/FaceTypeInput"
import {MakeUpCategoryInput} from "../../components/MakeUpCategoryInput"
import {FakeInput} from "../../components/FakeInput"
import {isEqual} from "../../helper/storeHelper"
import {KEYWORD_SEARCH_PLACE_HOLDER} from "../../styles/constants"
import {TrendKeywordsInput} from "../../components/TrendKeywordsInput"

const styles = {
  button: {
    height: 50,
    margin: 5,
    justifyContent: "center"
  },
  buttonLabel: {
    fontSize: 16
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

const onChipPress = (dispatch, tmpConditions, navigation) => keyword => () => {
  updateTmpConditions(dispatch, tmpConditions, {keywords: keyword})
  fetchPosts(dispatch, tmpConditions)
  navigation.navigate("SelectKeywords")
}


// eslint-disable-next-line max-lines-per-function
export const SelectConditions = ({navigation}) => {
  const {dispatch, state: {tmpConditions}} = useContext(searchStore)
  
  // TODO: 後でコンポーネントの外に出す
  // TODO: Accordionをやめるので、isExpanded, setIsExpandedを使わない。
  const conditions = [
    {title: "カテゴリで絞り込む", inner: <MakeUpCategoryInput key="makeUpCategory" />},
    {title: "色で絞り込む", inner: <ColorPaletteInput key="color" />},
    {title: "国で絞り込む", inner: <CountryInput key="country" />},
    {title: "パーソナルカラーで絞り込む", inner: <PersonalColorInput key="personalColor" />},
    {title: "顔型で絞り込む", inner: <FaceTypeInput key="faceType" />},
    {
      title: "キーワードで絞り込む",
      inner:
        // eslint-disable-next-line react/jsx-indent
        <View>
          <FakeInput placeholder={KEYWORD_SEARCH_PLACE_HOLDER} value={tmpConditions.keywords} navigation={navigation} linkTo="SelectKeywords" key="keyword" style={styles.FakeInput} />
          <TrendKeywordsInput onChipPress={onChipPress(dispatch, tmpConditions, navigation)} />
        </View>
    }
  ]
  
  const rows = createRows(conditions)

  return (
    <>
      <ScrollView>
        <List rows={rows} />
      </ScrollView>
      <Button mode="contained" style={styles.button} labelStyle={styles.buttonLabel} onPress={handlePress(dispatch, navigation)} disabled={isEqual(initialState.tmpConditions, tmpConditions)}>絞り込む</Button>
    </>
  )
}