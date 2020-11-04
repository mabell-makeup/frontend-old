/* eslint-disable react/display-name */
import React, {useContext} from "react"
import {List} from "../../components/List"
import {Button, List as L} from "react-native-paper"
import {ScrollView} from "react-native"
import {searchStore, updateSearchResult} from "../../stores/searchStore"

const styles = {
  button: {
    height: 50,
    marginHorizontal: 5,
    marginTop: 30,
    justifyContent: "center"
  }
}

const createRows = (columns, navigation) => columns.map(column => ({
  title: column.title,
  onPress: () => navigation.navigate(column.navigateTo),
  right: props => <L.Icon {...props} icon="chevron-right" />
}))

const columns = [
  {title: "色から探す", navigateTo: "SelectColor"},
  {title: "国から探す", navigateTo: "SelectCountry"},
  {title: "髪型から探す", navigateTo: "SelectHairStyle"},
  {title: "使用アイテムから探す", navigateTo: "SelectItems"}
]

const handlePress = (dispatch, navigation) => () => {
  updateSearchResult(dispatch)
  navigation.navigate("NewsFeed", {screen: "Women"})
}

export const SelectConditions = ({navigation}) => {
  const rows = createRows(columns, navigation)
  const {dispatch} = useContext(searchStore)

  return (
    <ScrollView>
      <List rows={rows} />
      <Button mode="contained" style={styles.button} onPress={handlePress(dispatch, navigation)}>絞り込む</Button>
    </ScrollView>
  )
}