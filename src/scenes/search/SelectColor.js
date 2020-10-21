import React from "react"
import {ScrollView} from "react-native"
import {ColorInput} from "../../components/ColorInput"

// TODO: カラーコードを別ファイルで定数にする
const colors = [
  "#dc143c",
  "#ff4500",
  "#db7093",
  "#ff8c00",
  "#00008b",
  "#008000",
  "#4b0082"
]

export const SelectColor = () => {
  return (
    <ScrollView>
      <ColorInput colors={colors} />
    </ScrollView>
  )
}
