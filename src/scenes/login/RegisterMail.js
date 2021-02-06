import React, {useContext, useState} from "react"
import {Button, TextInput, Title} from "react-native-paper"
import {View, StyleSheet, Text} from "react-native"
import {authStore, updateNewUser} from "../../stores/authStore"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  input: {
    maxHeight: 50,
    minWidth: 280,
    margin: 10
  },
  submit: {
    minHeight: 50,
    minWidth: 280,
    margin: 20,
    justifyContent: "center"
  },
  errMsg: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: "auto",
    color: "red"
  }
})

// TODO: バリデーション系はヘルパーにまとめる
const isEmail = text => /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(text)

export const RegisterMail = ({navigation}) => {
  const {dispatch} = useContext(authStore)
  const [errMsg, setErrMsg] = useState("")

  // TODO: 必須入力のバリデーションを追加
  const validate = text => isEmail(text) ? setErrMsg("") : setErrMsg("有効なメールアドレスを入力してください")
  const onChange = text => {
    validate(text)
    updateNewUser(dispatch, {mail: text})
  }

  return (
    <View style={styles.container}>
      <Title>メールアドレスを追加</Title>
      <Text></Text>
      <TextInput style={styles.input} mode="outlined" label="メールアドレス" onChangeText={onChange} secureTextEntry={true} />
      {errMsg !== "" && <Text style={styles.errMsg}>{errMsg}</Text>}
      <Button style={styles.submit} mode="contained" onPress={() => navigation.navigate("RegisterBirthdate")}>次へ</Button>
    </View>
  )
}
