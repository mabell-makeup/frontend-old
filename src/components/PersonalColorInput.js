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

const handlePress = (raw, element, dispatch, tmpConditions) => () => {
  // TODO: 雑なのであとで直す
  const next = tmpConditions.personalColor[element] === raw.key ? "" : raw.key
  const isClearSeason = element === "baseColor"
  updateTmpConditions(dispatch, tmpConditions, {personalColor: isClearSeason ? {[element]: next} : {...tmpConditions.personalColor, [element]: next}})
  fetchPosts(dispatch, tmpConditions)
}

const createItems = (raws, element="baseColor", dispatch, tmpConditions) =>
  raws.map(raw => ({
    label: raw.label,
    key: raw.key,
    // eslint-disable-next-line react/display-name
    selected: tmpConditions.personalColor[element] === raw.key,
    onPress: handlePress(raw, element, dispatch, tmpConditions)
  }))

export const PersonalColorInput = () => {
  const {dispatch, state: {tmpConditions}} = useContext(searchStore)
  const {state: {masterData}} = useContext(appStore)
  const seasons = parseMasterData(masterData, "season")
  const filteredSeasons = filterSeason(tmpConditions.personalColor.baseColor, seasons)
  const baseColor = parseMasterData(masterData, "base_color")
  const itemBaseColor = createItems(baseColor, "baseColor", dispatch, tmpConditions)
  const itemSeason = createItems(filteredSeasons, "season", dispatch, tmpConditions)
  const isShownSeason = tmpConditions.personalColor.baseColor !== ""

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