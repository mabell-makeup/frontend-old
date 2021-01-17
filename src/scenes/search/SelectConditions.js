/* eslint-disable react/display-name */
import React, {useContext, useState} from "react"
import {List} from "../../components/List"
import {Button} from "react-native-paper"
import {ScrollView, View} from "react-native"
import {searchStore, updateConditions, updateSearchResult, initialState} from "../../stores/searchStore"
import {ColorPaletteInput} from "../../components/ColorPaletteInput"
import {CountryInput} from "../../components/CountryInput"
import {PersonalColorInput} from "../../components/PersonalColorInput"
import {OutlineInput} from "../../components/OutlineInput"
import {MakeUpCategoryInput} from "../../components/MakeUpCategoryInput"
import {FakeSearchInput} from "../../components/FakeSearchInput"
import {useSomeStates} from "../../helper/hooksHelper"
import {isEqual} from "../../helper/storeHelper"
import {KEYWORD_SEARCH_PLACE_HOLDER} from "../../styles/constants"
import {TrendKeywordsInput} from "../../components/TrendKeywordsInput"

const styles = {
  button: {
    height: 50,
    margin: 5,
    justifyContent: "center"
  },
  accordion: {
    backgroundColor: "#c5d9e8",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1
  },
  fakeSearchInput: {
    marginTop: 10
  }
}

const handlePress = (dispatch, navigation) => () => {
  updateSearchResult(dispatch)
  updateConditions(dispatch)
  navigation.navigate("NewsFeed", {screen: "Women"})
}

const createRows = conditions => conditions.map(({title, inner, isExpanded, setIsExpanded}) => 
  ({title: title, rows: [inner], expanded: isExpanded, style: styles.accordion, onPress: () => setIsExpanded(!isExpanded), theme:{colors: {primary:"#000"}}})
)


// eslint-disable-next-line max-lines-per-function
export const SelectConditions = ({navigation}) => {
  const {dispatch, state: {tmpConditions}} = useContext(searchStore)
  const [
    [isPartExpanded, setIsPartExpanded],
    [isColorExpanded, setIsColorExpanded],
    [isCountryExpanded, setIsCountryExpanded],
    [isPersonalColorExpanded, setIsPersonalColorExpanded],
    [isOutlineExpanded, setIsOutlineExpanded],
    [isKeywordExpanded, setIsKeywordExpanded]
  ] = useSomeStates(useState, [true, true, true, true, true, true])
  
  // TODO: 後でコンポーネントの外に出す
  // TODO: Accordionをやめるので、isExpanded, setIsExpandedを使わない。
  const conditions = [
    {title: "カテゴリで絞り込む", inner: <MakeUpCategoryInput key="makeUpCategory" />, isExpanded: isPartExpanded, setIsExpanded: setIsPartExpanded},
    {title: "色で絞り込む", inner: <ColorPaletteInput key="color" />, isExpanded: isColorExpanded, setIsExpanded: setIsColorExpanded},
    {title: "国で絞り込む", inner: <CountryInput key="country" />, isExpanded: isCountryExpanded, setIsExpanded: setIsCountryExpanded},
    {title: "パーソナルカラーで絞り込む", inner: <PersonalColorInput key="personalColor" />, isExpanded: isPersonalColorExpanded, setIsExpanded: setIsPersonalColorExpanded},
    {title: "顔型で絞り込む", inner: <OutlineInput key="outline" />, isExpanded: isOutlineExpanded, setIsExpanded: setIsOutlineExpanded},
    {
      title: "キーワードで絞り込む",
      inner:
        // eslint-disable-next-line react/jsx-indent
        <View>
          <FakeSearchInput placeholder={KEYWORD_SEARCH_PLACE_HOLDER} value={tmpConditions.keywords} navigation={navigation} linkTo="SelectKeywords" key="keyword" style={styles.fakeSearchInput} />
          <TrendKeywordsInput navigation={navigation} />
        </View>,
      isExpanded: isKeywordExpanded,
      setIsExpanded: setIsKeywordExpanded
    }
  ]
  
  const rows = createRows(conditions)

  return (
    <>
      <ScrollView>
        <List rows={rows} />
      </ScrollView>
      <Button mode="contained" style={styles.button} onPress={handlePress(dispatch, navigation)} disabled={isEqual(initialState.tmpConditions, tmpConditions)}>絞り込む</Button>
    </>
  )
}