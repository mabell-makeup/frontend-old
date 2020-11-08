import React from "react"
import {View, FlatList} from "react-native"
import {ColorInput} from "../../components/ColorInput"
import {updateTmpConditionsColor, fetchPosts} from "../../stores/searchStore"


const createStyles = () => ({
  colorInputContainer: {
    width: `${100 / numColumns}%`,
    alignItems: "center"
  },
  container: {
    paddingTop: 5
  }
})

const numColumns = 5

const onPress = (navigation, dispatch, state, color) => () => {
  updateTmpConditionsColor(dispatch, color)
  fetchPosts(dispatch, state.tmpConditions)
  navigation.goBack()
}

const ColorPaletteInput = ({colors=[], navigation}) => {
  const styles = createStyles()
  const renderItem = ({item}) => <View style={styles.colorInputContainer}><ColorInput color={item} navigation={navigation} onPress={onPress} /></View>
  
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

// TODO: カラーコードを別ファイルで定数にする
const colors = [
  "#dc143c",
  "#db7093",
  "#ff8c00",
  "#8b4513",
  "#4b0082",
  "#00008b",
  "#008000"
]

// TODO: 色変更で2回レンダリングされてしまう。原因を解決するかuseMemoで対策する。
export const SelectColor = ({navigation}) => <ColorPaletteInput colors={colors} navigation={navigation} />
