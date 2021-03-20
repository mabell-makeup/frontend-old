import React from "react"
import {View, StyleSheet} from "react-native"
import {ChipList} from "./ChipList"
import {Text} from "react-native-paper"
import {parseMasterData} from "../helper/requestHelper"
import {useSelector} from "react-redux"

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

const createColorInputs = (colors, selectedColor, onColorInputPress) =>
  colors.map(color => ({
    label: color.label.match(/^.+\((.+)\)$/)[1],
    key: color.key,
    selected: color.key === selectedColor,
    onPress: onColorInputPress(color.key),
    left: <View style={{backgroundColor: color.label.replace(/\(.+\)/, ""), borderRadius: "50%", width: 20, height: 20}} />
  }))

const createGlitterInputs = (glitters, selectedGlitter, onGlitterInputPress) =>
  glitters.map(({key, label}) => ({
    label,
    key,
    selected: key === selectedGlitter,
    onPress: onGlitterInputPress(key)
  }))

export const ColorPaletteInput = ({tmpState={}, onColorInputPress=color=>color, onGlitterInputPress=glitter=>glitter}) => {
  const {masterData} = useSelector(({app: {masterData}}) => ({masterData}))
  const colors = parseMasterData(masterData, "color")
  const glitters = parseMasterData(masterData, "glitter")
  const colorInputs = createColorInputs(colors, tmpState.color, onColorInputPress)
  const glitterInputs = createGlitterInputs(glitters, tmpState.glitter, onGlitterInputPress)

  return (
    <View>
      <ChipList items={colorInputs} />
      <View style={styles.glitterContainer}>
        <Text style={styles.glitterLabel}>ラメの使用</Text>
        <ChipList items={glitterInputs} style={styles.glitter} />
      </View>
    </View>
  )
}