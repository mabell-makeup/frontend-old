import React, {useContext, useState} from "react"
import {Button, Title} from "react-native-paper"
import {View, StyleSheet} from "react-native"
import {authStore, updateNewUser} from "../../stores/authStore"
import DateTimePicker from "@react-native-community/datetimepicker"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  submit: {
    minHeight: 50,
    minWidth: 280,
    margin: 20,
    justifyContent: "center"
  },
  datePicker: {
    width: 320
  }
})

export const RegisterBirthdate = ({navigation}) => {
  const {dispatch} = useContext(authStore)
  const [birthdate, setBirthdate] = useState(new Date())

  // TODO: 必須入力と有効日付のバリデーションを追加

  const onChange = (e, selectedDate) => {
    setBirthdate(selectedDate)
    updateNewUser(dispatch, {birthdate: selectedDate})
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
        style={styles.datePicker}
      />
      <Button style={styles.submit} mode="contained" onPress={() => navigation.navigate("")}>次へ</Button>
    </View>
  )
}
