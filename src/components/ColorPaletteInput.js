import React, {useContext} from "react"
import {View, StyleSheet} from "react-native"
import {updateTmpConditions, fetchPosts, searchStore} from "../stores/searchStore"
import {ChipList} from "./ChipList"
import {Text} from "react-native-paper"

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

// TODO: カラーコードを別ファイルで定数にする
const colors = [
  {label: "レッド", code: "#EF0001"},
  {label: "オレンジ", code: "#FCA001"},
  {label: "イエロー", code: "#FEF500"},
  {label: "グリーン", code: "#009824"},
  {label: "ブルー", code: "#0772B6"},
  {label: "パープル", code: "#A1007E"},
  {label: "ライトブラウン", code: "#E3B1B8"},
  {label: "ダークブラウン", code: "#693A2F"},
  {label: "ゴールド", code: "#C1AB05"},
  {label: "シルバー", code: "#C0C0C0"},
  {label: "ブラック", code: "#000"}
]

const createColorInputs = (colors, dispatch, tmpConditions) =>
  colors.map(color => ({
    label: color.label,
    key: color.code,
    selected: color.code === tmpConditions.color,
    onPress: () => {
      updateTmpConditions(dispatch, tmpConditions, {color: color.code})
      fetchPosts(dispatch, tmpConditions)
    },
    left: <View style={{backgroundColor: color.code, borderRadius: "50%", width: 20, height: 20}} />
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