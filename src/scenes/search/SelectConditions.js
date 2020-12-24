/* eslint-disable react/display-name */
import React, {useContext} from "react"
import {List} from "../../components/List"
import {Button, List as L, Text} from "react-native-paper"
import {ScrollView} from "react-native"
import {searchStore, updateConditions, updateSearchResult} from "../../stores/searchStore"
import {ColorInput} from "../../components/ColorInput"
import * as masterData from "../../masterData"
import {ColorPaletteInput} from "../../components/ColorPaletteInput"
import {CountryInput} from "../../components/CountryInput"
import {PersonalColorInput} from "../../components/PersonalColorInput"
import {FaceTypeInput} from "../../components/FaceTypeInput"

const styles = {
  button: {
    height: 50,
    marginHorizontal: 5,
    marginTop: 30,
    justifyContent: "center"
  }
}

// TODO: おそらくバグが出るから後で直す
const getTitle = key => {
  for (const data in masterData) {
    // eslint-disable-next-line no-prototype-builtins
    if (masterData[data].hasOwnProperty(key)) {
      return masterData[data][key]
    }
  }
}

const createRows = (columns, navigation) => columns.map(column => ({
  title: column.title,
  onPress: () => navigation.navigate(column.navigateTo),
  right: column.right ? column.right : props => <L.Icon {...props} icon="chevron-right" />
}))

const createColumns = tmpConditions => ([
  {title: "色から探す", navigateTo: "SelectColor", right: tmpConditions.color ? () => <ColorInput color={tmpConditions.color} /> : false},
  {title: "国から探す", navigateTo: "SelectCountry", right: tmpConditions.country ? () => <Text>{getTitle(tmpConditions.country)}</Text> : false},
  {title: "髪型から探す", navigateTo: "SelectHairStyle", right: tmpConditions.hairStyle ? () => <Text>{getTitle(tmpConditions.hairStyle)}</Text> : false},
  {title: "使用アイテムから探す", navigateTo: "SelectItems", right: tmpConditions.items.length > 0 ? () => <Text>{tmpConditions.items.length}件選択中</Text> : false}
])

const handlePress = (dispatch, navigation) => () => {
  updateSearchResult(dispatch)
  updateConditions(dispatch)
  navigation.navigate("NewsFeed", {screen: "Women"})
}

export const SelectConditions = ({navigation}) => {
  const {dispatch} = useContext(searchStore)
  const rows = [
    {title: "色から探す", rows: [<ColorPaletteInput key="color" />]},
    {title: "国から探す", rows: [<CountryInput key="country" />]},
    {title: "パーソナルカラーから探す", rows: [<PersonalColorInput key="personalColor" />]},
    {title: "顔タイプから探す", rows: [<FaceTypeInput key="faceType" />]}
  ]

  return (
    <ScrollView>
      <List rows={rows} />
      <Button mode="contained" style={styles.button} onPress={handlePress(dispatch, navigation)}>絞り込む</Button>
    </ScrollView>
  )
}