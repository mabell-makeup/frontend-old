import React from "react"
import DateTimePicker from "@react-native-community/datetimepicker"
import {Text, StyleSheet, View} from "react-native"

const styles = StyleSheet.create({
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
  }
})


export const DatePicker = ({usePickerState=[{isShown: false, selected: ""}, ()=>{}]}) => {
  const [pickerState, setPickerState] = usePickerState
  const {isShown, selected} = pickerState

  return isShown &&
    <View style={styles.container}>
      <Text onPress={() => setPickerState({...pickerState, isShown: false})} style={styles.close}>閉じる</Text>
      <DateTimePicker
        value={selected}
        mode="date"
        display="spinner"
        onChange={(e, selectedDate) => setPickerState({...pickerState, selected: selectedDate})}
      />
    </View>
}