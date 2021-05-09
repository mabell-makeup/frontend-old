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


export const WheelPicker = ({usePickerState=[{isShown: false, choices: []}, ()=>{}], onChange=itemValue=>itemValue}) => {
  const [pickerState, setPickerState] = usePickerState
  const {isShown, choices, key, selected} = pickerState

  return (
    <>
      {isShown &&
        <View style={styles.container}>
          <Text onPress={() => setPickerState({choices, isShown: false})} style={styles.close}>閉じる</Text>
          <Picker
            selectedValue={selected}
            onValueChange={itemValue => {
              setPickerState({...pickerState, selected: itemValue})
              onChange({[key]: itemValue})
            }}
            style={styles.picker}
          >
            {/* eslint-disable-next-line react/jsx-key */}
            {choices.map(item => <Picker.Item value={item.key} {...item} />)}
          </Picker>
        </View>
      }
    </>
  )
}