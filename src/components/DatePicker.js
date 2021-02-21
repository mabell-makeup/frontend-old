import React from "react"
import DateTimePicker from "@react-native-community/datetimepicker"
import {Text, StyleSheet, View} from "react-native"
import {formatDate} from "../helper/dateHelper"

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


export const DatePicker = ({usePickerState=[{isShown: false, selected: ""}, ()=>{}], onChange=selectedDate=>selectedDate}) => {
  const [pickerState, setPickerState] = usePickerState
  const {isShown, selected} = pickerState

  return isShown &&
    <View style={styles.container}>
      <Text onPress={() => setPickerState({...pickerState, isShown: false})} style={styles.close}>閉じる</Text>
      <DateTimePicker
        value={new Date(selected)}
        mode="date"
        display="spinner"
        maximumDate={new Date()}
        onChange={(e, selectedDate) => {
          setPickerState({...pickerState, selected: selectedDate})
          onChange(formatDate(selectedDate))
        }}
      />
    </View>
}