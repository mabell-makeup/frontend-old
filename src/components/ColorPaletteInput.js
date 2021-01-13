import React from "react"
import {View, FlatList} from "react-native"
import {ColorInput} from "./ColorInput"
import {updateTmpConditions, fetchPosts} from "../stores/searchStore"


const createStyles = () => ({
  colorInputContainer: {
    width: `${100 / numColumns}%`,
    alignItems: "center"
  },
  container: {
    paddingTop: 2,
    paddingHorizontal: 15
  }
})

const numColumns = 6

const onPress = (dispatch, state, color) => () => {
  updateTmpConditions(dispatch, {color})
  fetchPosts(dispatch, state.tmpConditions)
}

// TODO: カラーコードを別ファイルで定数にする
const colors = [
  "#CD0F0D",
  "#86494E",
  "#E3B1B8",
  "#D3835A",
  "#B77845",
  "#D3B0D4",
  "#314358",
  "#82A2A6"
]

export const ColorPaletteInput = () => {
  const styles = createStyles()
  const renderItem = ({item}) => <View style={styles.colorInputContainer}><ColorInput color={item} onPress={onPress} /></View>
  
  return (
    <FlatList 
      data={colors}
      renderItem={renderItem}
      keyExtractor={({color}) => color}
      numColumns={numColumns}
      style={styles.container}
    />
  )
}
