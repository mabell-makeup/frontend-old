import React, {useContext} from "react"
import {StyleSheet, View} from "react-native"
import {Text} from "react-native-paper"
import {parseMasterData} from "../helper/requestHelper"
import {appStore} from "../stores/appStore"
import {searchStore, updateTmpConditions, fetchPosts} from "../stores/searchStore"
import {ChipList} from "./ChipList"

const styles = StyleSheet.create({
  container: {
    marginVertical: 2
  },
  row: {
    marginBottom: 5
  },
  label: {
    marginTop: 5,
    marginLeft: 15,
    fontSize: 12,
    fontWeight: "bold"
  },
  chipList: {
    marginLeft: 15
  }
})

const filterSeason = (baseColor, seasons) => baseColor === 0
  ? seasons.filter(season => season.key % 2 === 0)
  : seasons.filter(season => season.key % 2 === 1)

const handlePress = (key, element, dispatch, tmpConditions) => () => {
  updateTmpConditions(dispatch, tmpConditions, {[element]: key})
  element === "base_color" && updateTmpConditions(dispatch, tmpConditions, {season: ""})
}

const createItems = (raws, element="base_color", dispatch, tmpConditions) =>
  raws.map(raw => ({
    label: raw.label,
    key: raw.key,
    selected: tmpConditions[element] === raw.key,
    onPress: handlePress(raw.key, element, dispatch, tmpConditions)
  }))

export const PersonalColorInput = () => {
  const {dispatch, state: {tmpConditions}} = useContext(searchStore)
  const {state: {masterData}} = useContext(appStore)
  const seasons = parseMasterData(masterData, "season")
  const filteredSeasons = filterSeason(tmpConditions.base_color, seasons)
  const baseColor = parseMasterData(masterData, "base_color")
  const itemBaseColor = createItems(baseColor, "base_color", dispatch, tmpConditions)
  const itemSeason = createItems(filteredSeasons, "season", dispatch, tmpConditions)
  const isShownSeason = tmpConditions.base_color !== ""

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>ベースカラー</Text>
        <ChipList items={itemBaseColor} style={styles.chipList} />
      </View>
      {isShownSeason && 
        <View>
          <Text style={styles.label}>季節</Text>
          <ChipList items={itemSeason} style={styles.chipList} />
        </View>
      }
    </View>
  )
}