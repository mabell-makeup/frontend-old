import React, {useContext, useState} from "react"
import {Button, TextInput, Title} from "react-native-paper"
import {View, StyleSheet} from "react-native"
import {authStore, updateNewUser} from "../../stores/authStore"
import {ErrorMessage} from "../../components/ErrorMessage"
import {onlyDigit, require, validate} from "../../helper/validateHelper"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center"
  },
  input: {
    maxHeight: 50,
    minWidth: 280,
    margin: 10
  },
  submit: {
    height: 50,
    minWidth: 280,
    margin: 20,
    justifyContent: "center"
  },
  buttonContentStyle: {
    height: "100%"
  }
})

const rules = [require, onlyDigit, {testFunc: text => text.length >= 4, message: "ユーザー名が短すぎます"}]

const onChange = (setText, setError) => text => {
  setError(validate(text, rules))
  setText(text)
}

const onSubmit = (text, error, setError, dispatch, navigation) => () => {
  setError(validate(text, rules))
  if (error.length === 0) {
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
      <TextInput style={styles.input} mode="outlined" label="ユーザー名" error={error.length > 0} onChangeText={onChange(setText, setError)} />
      <ErrorMessage messages={error} />
      <Button
        style={styles.submit}
        contentStyle={styles.buttonContentStyle}
        mode="contained"
        disabled={text.length === 0 || error.length > 0}
        onPress={onSubmit(text, error, setError, dispatch, navigation)}
      >次へ</Button>
    </View>
  )
}
