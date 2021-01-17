/* eslint-disable react/display-name */
import React, {useContext, useState} from "react"
import {List} from "../../components/List"
import {Button} from "react-native-paper"
import {ScrollView} from "react-native"
import {searchStore, updateConditions, updateSearchResult, initialState} from "../../stores/searchStore"
import {ColorPaletteInput} from "../../components/ColorPaletteInput"
import {CountryInput} from "../../components/CountryInput"
import {PersonalColorInput} from "../../components/PersonalColorInput"
import {FaceTypeInput} from "../../components/FaceTypeInput"
import {MakeUpCategoryInput} from "../../components/MakeUpCategoryInput"
import {FakeSearchInput} from "../../components/FakeSearchInput"
import {useSomeStates} from "../../helper/hooksHelper"
import {isEqual} from "../../helper/storeHelper"

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


export const SelectConditions = ({navigation}) => {
  const {dispatch, state: {tmpConditions}} = useContext(searchStore)
  const [
    [isPartExpanded, setIsPartExpanded],
    [isColorExpanded, setIsColorExpanded],
    [isCountryExpanded, setIsCountryExpanded],
    [isPersonalColorExpanded, setIsPersonalColorExpanded],
    [isFaceTypeExpanded, setIsFaceTypeExpanded],
    [isKeywordExpanded, setIsKeywordExpanded]
  ] = useSomeStates(useState, [true, true, true, true, true, true])
  
  // TODO: 後でコンポーネントの外に出す
  // TODO: Accordionをやめるので、isExpanded, setIsExpandedを使わない。
  const conditions = [
    {title: "カテゴリで絞り込む", inner: <MakeUpCategoryInput key="makeUpCategory" />, isExpanded: isPartExpanded, setIsExpanded: setIsPartExpanded},
    {title: "色で絞り込む", inner: <ColorPaletteInput key="color" />, isExpanded: isColorExpanded, setIsExpanded: setIsColorExpanded},
    {title: "国で絞り込む", inner: <CountryInput key="country" />, isExpanded: isCountryExpanded, setIsExpanded: setIsCountryExpanded},
    {title: "パーソナルカラーで絞り込む", inner: <PersonalColorInput key="personalColor" />, isExpanded: isPersonalColorExpanded, setIsExpanded: setIsPersonalColorExpanded},
    {title: "顔タイプで絞り込む", inner: <FaceTypeInput key="faceType" />, isExpanded: isFaceTypeExpanded, setIsExpanded: setIsFaceTypeExpanded},
    {title: "キーワードで絞り込む", inner: <FakeSearchInput value={tmpConditions.keywords} navigation={navigation} linkTo="SelectKeywords" key="keyword" style={styles.fakeSearchInput} />, isExpanded: isKeywordExpanded, setIsExpanded: setIsKeywordExpanded}
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