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

export const CreatePassword = ({navigation}) => {
  const {dispatch} = useContext(authStore)
  const [password, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState("")

  // TODO: 必須入力と使用可能文字のバリデーションを追加
  const validate = text => text !== password ? setErrMsg("パスワードが一致しません") : setErrMsg("")
  const onChange = text => {
    setPassword(text)
    updateNewUser(dispatch, {password: text})
  }

  return (
    <View style={styles.container}>
      <Title>パスワードを作成</Title>
      <TextInput style={styles.input} mode="outlined" label="パスワード" onChangeText={onChange} secureTextEntry={true} />
      <TextInput style={styles.input} mode="outlined" label="パスワード再確認" onChangeText={text => validate(text)} secureTextEntry={true} error={errMsg !== ""} />
      {errMsg !== "" && <Text style={styles.errMsg}>{errMsg}</Text>}
      <Button style={styles.submit} mode="contained" onPress={() => navigation.navigate("CreateBirthdate")}>次へ</Button>
    </View>
  )
}
