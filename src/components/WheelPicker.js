import React from "react"
import {View, Text} from "react-native"
import {Picker} from "@react-native-picker/picker"

const styles = {
  container: {
    backgroundColor: "#eee",
    zIndex: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  close: {
    margin: 20,
    fontWeight: "bold",
    marginLeft: "auto"
  },
  picker: {
    margin: 0
  }
}


export const WheelPicker = ({usePickerState=[{isShown: false, items: [], selected: ""}, ()=>{}]}) => {
  const [pickerState, setPickerState] = usePickerState
  const {isShown, items, selected} = pickerState

  return (
    <>
      {isShown &&
        <View style={styles.container}>
          <Text onPress={() => setPickerState({...pickerState, isShown: false})} style={styles.close}>閉じる</Text>
          <Picker
            selectedValue={selected}
            onValueChange={itemValue => setPickerState({...pickerState, selected: itemValue})}
            style={styles.picker}
          >
            {items.map(item => <Picker.Item key={item.value} {...item} />)}
          </Picker>
        </View>
      }
    </>
  )
}