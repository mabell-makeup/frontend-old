import React, {useState} from "react"
import {Button, TextInput, Title} from "react-native-paper"
import {View, StyleSheet} from "react-native"
import {signup, updateNewUser} from "../../stores/authStore"
import {ErrorMessage} from "../../components/ErrorMessage"
import {validate, rules as R} from "../../helper/validateHelper"
import {addError} from "../../stores/appStore"
import {useDispatch, useSelector} from "react-redux"

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

const onSubmit = (text, setError, dispatch, new_user, navigation) => async () => {
  const messages = validate(text, rules)
  setError(messages)
  if (messages.length === 0) {
    try {
      await signup(dispatch, {...new_user, name: text})
      await updateNewUser(dispatch, {name: text, nickname: text})
      navigation.reset({index: 0, routes: [{name: "SendConfirmationMail"}]})
    } catch (error) {
      error.code === "UsernameExistsException"
        ? setError(["このユーザー名は使用できません"])
        : addError(dispatch, {errorType: "REQUEST_ERROR", message: "予期せぬエラーが発生しました"})
    }
  }
}

export const RegisterUsername = ({navigation}) => {
  const dispatch = useDispatch()
  const new_user = useSelector(({auth: {new_user}}) => new_user)
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
        onPress={onSubmit(text, setError, dispatch, new_user, navigation)}
      >次へ</Button>
    </View>
  )
}
