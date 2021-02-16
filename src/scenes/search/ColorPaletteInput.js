import React, {useContext} from "react"
import {View, StyleSheet} from "react-native"
import {updateTmpConditions, fetchPosts, searchStore} from "../../stores/searchStore"
import {ChipList} from "../../components/ChipList"
import {Text} from "react-native-paper"
import {parseMasterData} from "../../helper/requestHelper"
import {appStore} from "../../stores/appStore"

const styles = StyleSheet.create({
  lameContainer: {
    marginTop: 10
  },
  lameLabel: {
    marginTop: 5,
    marginLeft: 15,
    fontSize: 12,
    fontWeight: "bold"
  },
  lame: {
    marginLeft: 15
  }
})

const createColorInputs = (colors, dispatch, tmpConditions) =>
  colors.map(color => ({
    label: color.label.match(/^.+\((.+)\)$/)[1],
    key: color.key,
    selected: color.key === tmpConditions.color,
    onPress: () => {
      updateTmpConditions(dispatch, tmpConditions, {color: color.key})
      fetchPosts(dispatch, tmpConditions)
    },
    left: <View style={{backgroundColor: color.label.replace(/\(.+\)/, ""), borderRadius: "50%", width: 20, height: 20}} />
  }))

const createLameInputs = (dispatch, tmpConditions) =>
  [true, false].map(lame => ({
    label: lame ? "ラメあり" : "ラメなし",
    key: lame ? "ラメあり" : "ラメなし",
    selected: lame === tmpConditions.lame,
    onPress: () => {
      updateTmpConditions(dispatch, tmpConditions, {lame})
      fetchPosts(dispatch, tmpConditions)
    }
  }))

export const ColorPaletteInput = () => {
  const {dispatch, state: {tmpConditions}} = useContext(searchStore)
  const {state: {masterData}} = useContext(appStore)
  const colors = parseMasterData(masterData, "color")
  const colorInputs = createColorInputs(colors, dispatch, tmpConditions)
  const lameInputs = createLameInputs(dispatch, tmpConditions)

  return (
    <View>
      <ChipList items={colorInputs} />
      <View style={styles.lameContainer}>
        <Text style={styles.lameLabel}>ラメを使う</Text>
        <ChipList items={lameInputs} style={styles.lame} />
      </View>
    </View>
  )
}