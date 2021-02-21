import React, {useContext, useState} from "react"
import {Button, TextInput, Title} from "react-native-paper"
import {View, StyleSheet, Text} from "react-native"
import {authStore, updateNewUser} from "../../stores/authStore"
import {ErrorMessage} from "../../components/ErrorMessage"
import {validate, rules as R} from "../../helper/validateHelper"

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    alignItems: "center"
  },
  input: {
    maxHeight: 50,
    width: 300,
    margin: 10
  },
  submit: {
    height: 50,
    width: 300,
    margin: 20,
    justifyContent: "center"
  },
  buttonContentStyle: {
    height: "100%"
  },
  precautionsContainer: {
    width: 300,
    justifyContent: "flex-start",
    marginTop: 20
  },
  precautions: {
    marginVertical: 2
  }
})

const rules = confirm => ([
  R.require,
  R.includeLowercase,
  R.includeUppercase,
  R.includeNumber,
  R.includeSpecialChar,
  {testFunc: text => text.length >= 6, message: "パスワードが短すぎます"},
  {testFunc: text => text === confirm, message: "パスワードが一致しません"}
])

const onSubmit = (dispatch, navigation, setError, password, confirm) => () => {
  const messages = validate(password, rules(confirm))
  setError(messages)
  if (messages.length === 0) {
    updateNewUser(dispatch, {password})
    navigation.navigate("RegisterBirthdate")
  }
}

export const RegisterPassword = ({navigation}) => {
  const {dispatch} = useContext(authStore)
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState([])

  return (
    <View style={styles.container}>
      <Title>パスワードを作成</Title>
      <TextInput style={styles.input} mode="outlined" label="パスワード" onChangeText={setPassword} error={error.length > 0} secureTextEntry={true} />
      <TextInput style={styles.input} mode="outlined" label="パスワード再確認" onChangeText={setConfirm} error={error.length > 0} secureTextEntry={true} />
      <ErrorMessage messages={error}/>
      <View style={styles.precautionsContainer}>
        <Text style={styles.precautions}>パスワードは以下の要件を満たす必要があります</Text>
        <Text style={styles.precautions}>・６文字以上</Text>
        <Text style={styles.precautions}>・記号を含む</Text>
        <Text style={styles.precautions}>・大文字/小文字を含む</Text>
        <Text style={styles.precautions}>・数字を含む</Text>
      </View>
      <Button
        style={styles.submit}
        contentStyle={styles.buttonContentStyle}
        mode="contained"
        disabled={password.length === 0 || confirm.length === 0}
        onPress={onSubmit(dispatch, navigation, setError, password, confirm)}
      >次へ</Button>
    </View>
  )
}
