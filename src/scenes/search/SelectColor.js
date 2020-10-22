import React, {useContext} from "react"
import {View, FlatList} from "react-native"
import {Checkbox} from "react-native-paper"
import {searchStore, updateColor} from "../../stores/searchStore"


const createStyles = ({color}) => ({
  checkbox: {
    backgroundColor: color,
    width: 40,
    height: 40,
    borderRadius: "50%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 5
  },
  checkBoxContainer: {
    width: `${100 / numColumns}%`,
    alignItems: "center"
  },
  container: {
    paddingTop: 5
  }
})

const numColumns = 5

const ColorInputItem = ({color, navigation}) => {
  const {dispatch, state} = useContext(searchStore)
  const styles = createStyles({color})
  const handlePress = navigation => () => {
    updateColor(dispatch, color)
    navigation.goBack()
  }

  return (
    <View style={styles.checkbox}>
      <Checkbox
        status={color === state.color ? "checked" : "unchecked"}
        onPress={handlePress(navigation)}
        color="#fff"
        width={40}
      />
    </View>
  )
}

const ColorInput = ({colors=[], navigation}) => {
  const styles = createStyles({})
  const renderItem = ({item}) => <View style={styles.checkBoxContainer}><ColorInputItem color={item} navigation={navigation} /></View>
  
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
export const SelectColor = ({navigation}) => <ColorInput colors={colors} navigation={navigation} />
