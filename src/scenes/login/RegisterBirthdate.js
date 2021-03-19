import React, {useState} from "react"
import {Button, Title} from "react-native-paper"
import {View, StyleSheet} from "react-native"
import {updateNewUser} from "../../stores/authStore"
import DateTimePicker from "@react-native-community/datetimepicker"
import {formatDate} from "../../helper/dateHelper"
import {useDispatch} from "react-redux"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center"
  },
  submit: {
    height: 50,
    minWidth: 280,
    margin: 20,
    justifyContent: "center"
  },
  buttonContentStyle: {
    height: "100%"
  },
  datePicker: {
    width: 320
  }
})


export const RegisterBirthdate = ({navigation}) => {
  const dispatch = useDispatch()
  const [birthdate, setBirthdate] = useState(new Date())

  const onChange = (e, selectedDate) => {
    setBirthdate(selectedDate)
    updateNewUser(dispatch, {birthdate: formatDate(selectedDate)})
  }

  return (
    <View style={styles.container}>
      <Title>誕生日を追加</Title>
      <DateTimePicker
        testID="dateTimePicker"
        value={birthdate}
        mode="date"
        display="spinner"
        onChange={onChange}
        maximumDate={new Date()}
        style={styles.datePicker}
      />
      <Button style={styles.submit} contentStyle={styles.buttonContentStyle} mode="contained" onPress={() => navigation.navigate("RegisterUsername")}>次へ</Button>
    </View>
  )
}
