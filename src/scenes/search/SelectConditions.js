/* eslint-disable react/display-name */
import React, {useContext} from "react"
import {List} from "../../components/List"
import {Button} from "react-native-paper"
import {ScrollView} from "react-native"
import {searchStore, updateConditions, updateSearchResult} from "../../stores/searchStore"
import {ColorPaletteInput} from "../../components/ColorPaletteInput"
import {CountryInput} from "../../components/CountryInput"
import {PersonalColorInput} from "../../components/PersonalColorInput"
import {FaceTypeInput} from "../../components/FaceTypeInput"
import {PartInput} from "../../components/PartInput"
import {FakeSearchInput} from "../../components/FakeSearchInput"

const styles = {
  button: {
    height: 50,
    marginHorizontal: 5,
    marginTop: 30,
    justifyContent: "center"
  }
}

const handlePress = (dispatch, navigation) => () => {
  updateSearchResult(dispatch)
  updateConditions(dispatch)
  navigation.navigate("NewsFeed", {screen: "Women"})
}

export const SelectConditions = ({navigation}) => {
  const {dispatch} = useContext(searchStore)
  const rows = [
    {title: "パーツで絞り込む", rows: [<PartInput key="part" />]},
    {title: "色で絞り込む", rows: [<ColorPaletteInput key="color" />]},
    {title: "国で絞り込む", rows: [<CountryInput key="country" />]},
    {title: "パーソナルカラーで絞り込む", rows: [<PersonalColorInput key="personalColor" />]},
    {title: "顔タイプで絞り込む", rows: [<FaceTypeInput key="faceType" />]},
    {title: "キーワードで絞り込む", rows: [<FakeSearchInput navigation={navigation} linkTo="SelectItems" key="keyword" />]}
  ]

  return (
    <ScrollView>
      <List rows={rows} />
      <Button mode="contained" style={styles.button} onPress={handlePress(dispatch, navigation)}>絞り込む</Button>
    </ScrollView>
  )
}