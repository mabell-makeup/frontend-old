import React, {useContext, useState} from "react"
import {Button, TextInput, Title} from "react-native-paper"
import {View, StyleSheet} from "react-native"
import {authStore, updateNewUser} from "../../stores/authStore"
import {ErrorMessage} from "../../components/ErrorMessage"
import {validate, rules as R} from "../../helper/validateHelper"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center"
  },
  input: {
    maxHeight: 50,
    minWidth: 300,
    margin: 10
  },
  submit: {
    height: 50,
    minWidth: 300,
    margin: 20,
    justifyContent: "center"
  },
  buttonContentStyle: {
    height: "100%"
  }
})

const rules = [
  R.require,
  R.onlyWordChar,
  {testFunc: text => text.length >= 4, message: "ユーザー名が短すぎます"}
]

const onSubmit = (text, setError, dispatch, navigation) => () => {
  const messages = validate(text, rules)
  setError(messages)
  if (messages.length === 0) {
    updateNewUser(dispatch, {name: text})
    navigation.navigate("RegisterPassword")
  }
}

export const RegisterUsername = ({navigation}) => {
  const {dispatch} = useContext(authStore)
  const [error, setError] = useState([])
  const [text, setText] = useState("")

  return (
    <View style={styles.container}>
      <Title>ユーザー名を作成</Title>
      <TextInput style={styles.input} mode="outlined" label="ユーザー名" error={error.length > 0} onChangeText={setText} />
      <ErrorMessage messages={error} />
      <Button
        style={styles.submit}
        contentStyle={styles.buttonContentStyle}
        mode="contained"
        disabled={text.length === 0}
        onPress={onSubmit(text, setError, dispatch, navigation)}
      >次へ</Button>
    </View>
  )
}
