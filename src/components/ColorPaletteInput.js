import React, {useContext} from "react"
import {View, FlatList} from "react-native"
import {ColorInput} from "./ColorInput"
import {Switch, Text} from "react-native-paper"
import {updateTmpConditions, fetchPosts, searchStore} from "../stores/searchStore"


const createStyles = () => ({
  colorInputContainer: {
    width: `${100 / numColumns}%`,
    alignItems: "center"
  },
  container: {
    paddingVertical: 4,
    paddingHorizontal: 10
  },
  lameSwitch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 10,
    paddingRight: 10
  },
  lameLabel: {
    marginRight: 5,
    fontSize: 12
  }
})

const numColumns = 6

const onPress = (dispatch, state, color) => () => {
  updateTmpConditions(dispatch, state.tmpConditions, {color})
  fetchPosts(dispatch, state.tmpConditions)
}

// TODO: カラーコードを別ファイルで定数にする
const colors = [
  "#EF0001",
  "#FCA001",
  "#FEF500",
  "#009824",
  "#0772B6",
  "#A1007E",
  "#E3B1B8",
  "#693A2F",
  "#C1AB05",
  "#C0C0C0",
  "#000"
]

export const ColorPaletteInput = () => {
  const styles = createStyles()
  const {dispatch, state: {tmpConditions}} = useContext(searchStore)
  const renderItem = ({item}) => <View style={styles.colorInputContainer}><ColorInput color={item} onPress={onPress} /></View>
  
  return (
    <View style={styles.container}>
      <FlatList 
        data={colors}
        renderItem={renderItem}
        keyExtractor={({color}) => color}
        numColumns={numColumns}
      />
      <View style={styles.lameSwitch}>
        <Text style={styles.lameLabel}>ラメを使う</Text>
        <Switch value={tmpConditions.lame} onValueChange={() => updateTmpConditions(dispatch, tmpConditions, {lame: !tmpConditions.lame})} />
      </View>
    </View>
  )
}
