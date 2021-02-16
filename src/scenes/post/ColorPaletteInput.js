import React, {useContext} from "react"
import {View, StyleSheet} from "react-native"
import {ChipList} from "../../components/ChipList"
import {Text} from "react-native-paper"
import {parseMasterData} from "../../helper/requestHelper"
import {appStore} from "../../stores/appStore"
import {postStore, updateTmpPost} from "../../stores/postStore"

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

const createColorInputs = (colors, dispatch, tmpPost) =>
  colors.map(color => ({
    label: color.label.match(/^.+\((.+)\)$/)[1],
    key: color.key,
    selected: color.key === tmpPost.color,
    onPress: () => updateTmpPost(dispatch, tmpPost, {color: color.key}),
    left: <View style={{backgroundColor: color.label.replace(/\(.+\)/, ""), borderRadius: "50%", width: 20, height: 20}} />
  }))

const createGlitterInputs = (glitters, dispatch, tmpPost) =>
  glitters.map(({key, label}) => ({
    label,
    key,
    selected: key === tmpPost.glitter,
    onPress: () => updateTmpPost(dispatch, tmpPost, {glitter: key})
  }))

export const ColorPaletteInput = () => {
  const {state: {masterData}} = useContext(appStore)
  const {dispatch, state: {tmpPost}} = useContext(postStore)
  const colors = parseMasterData(masterData, "color")
  const glitters = parseMasterData(masterData, "glitter")
  const colorInputs = createColorInputs(colors, dispatch, tmpPost)
  const glitterInputs = createGlitterInputs(glitters, dispatch, tmpPost)

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