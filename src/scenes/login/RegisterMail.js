import React, {useContext, useState} from "react"
import {Button, TextInput, Title} from "react-native-paper"
import {View, StyleSheet, Text} from "react-native"
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
  },
  errMsg: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: "auto",
    color: "red"
  }
})

const rules = [
  R.require,
  R.mail
]

const onSubmit = (dispatch, navigation, setError, text) => () => {
  const messages = validate(text, rules)
  setError(messages)
  if (messages.length === 0) {
    updateNewUser(dispatch, {email: text})
    navigation.navigate("RegisterBirthdate")
  }
}


export const RegisterMail = ({navigation}) => {
  const {dispatch} = useContext(authStore)
  const [text, setText] = useState("")
  const [error, setError] = useState([])

  return (
    <View style={styles.container}>
      <Title>メールアドレスを追加</Title>
      <Text></Text>
      <TextInput style={styles.input} mode="outlined" label="メールアドレス" error={error.length > 0} onChangeText={setText} />
      <ErrorMessage messages={error} />
      <Button
        style={styles.submit}
        contentStyle={styles.buttonContentStyle}
        mode="contained"
        disabled={text.length === ""}
        onPress={onSubmit(dispatch, navigation, setError, text)}
      >次へ</Button>
    </View>
  )
}
