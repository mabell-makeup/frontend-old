import React from "react"
import {View, FlatList} from "react-native"
import {Checkbox} from "react-native-paper"


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

const ColorInputItem = ({color}) => {
  const [checked, setChecked] = React.useState(false)
  const styles = createStyles({color})

  return (
    <View style={styles.checkbox}>
      <Checkbox
        status={checked ? "checked" : "unchecked"}
        onPress={() => {setChecked(!checked)}}
        color="#fff"
        width={40}
      />
    </View>
  )
}

const ColorInput = ({colors=[]}) => {
  const styles = createStyles({})
  const renderItem = ({item}) => <View style={styles.checkBoxContainer}><ColorInputItem color={item} /></View>
  
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
  "#ff4500",
  "#db7093",
  "#ff8c00",
  "#00008b",
  "#008000",
  "#4b0082"
]

export const SelectColor = () => <ColorInput colors={colors} />
