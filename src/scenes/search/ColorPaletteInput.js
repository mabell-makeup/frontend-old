import React, {useContext} from "react"
import {View, StyleSheet} from "react-native"
import {updateTmpConditions, searchStore} from "../../stores/searchStore"
import {ChipList} from "../../components/ChipList"
import {Text} from "react-native-paper"
import {parseMasterData} from "../../helper/requestHelper"
import {appStore} from "../../stores/appStore"

const styles = StyleSheet.create({
  glitterContainer: {
    marginTop: 10
  },
  glitterLabel: {
    marginTop: 5,
    marginLeft: 15,
    fontSize: 12,
    fontWeight: "bold"
  },
  glitter: {
    marginLeft: 15
  }
})

const createColorInputs = (colors, dispatch, tmpConditions) =>
  colors.map(color => ({
    label: color.label.match(/^.+\((.+)\)$/)[1],
    key: color.key,
    selected: color.key === tmpConditions.color,
    onPress: () => updateTmpConditions(dispatch, tmpConditions, {color: color.key}),
    left: <View style={{backgroundColor: color.label.replace(/\(.+\)/, ""), borderRadius: "50%", width: 20, height: 20}} />
  }))

const createGlitterInputs = (glitters, dispatch, tmpConditions) =>
  glitters.map(({key, label}) => ({
    label,
    key,
    selected: key === tmpConditions.glitter,
    onPress: () => updateTmpConditions(dispatch, tmpConditions, {glitter: key})
  }))


export const ColorPaletteInput = () => {
  const {dispatch, state: {tmpConditions}} = useContext(searchStore)
  const {state: {masterData}} = useContext(appStore)
  const glitters = parseMasterData(masterData, "glitter")
  const colors = parseMasterData(masterData, "color")
  const colorInputs = createColorInputs(colors, dispatch, tmpConditions)
  const glitterInputs = createGlitterInputs(glitters, dispatch, tmpConditions)

  return (
    <View>
      <ChipList items={colorInputs} />
      <View style={styles.glitterContainer}>
        <Text style={styles.glitterLabel}>ラメを使う</Text>
        <ChipList items={glitterInputs} style={styles.glitter} />
      </View>
    </View>
  )
}