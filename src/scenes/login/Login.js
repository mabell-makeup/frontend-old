import React, {useContext, useState} from "react"
import {Button, TextInput, Text} from "react-native-paper"
import {View, StyleSheet, Image} from "react-native"
import {defaultStyle} from "../../styles/defaultStyle"
import {authStore, login} from "../../stores/authStore"

const styles = StyleSheet.create({
  ...defaultStyle,
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
  signupLink: {
    fontWeight: "bold"
  },
  logo: {
    width: 100,
    height: 100
  },
  errMsg: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: "auto",
    color: "red"
  }
})

export const Login = ({navigation}) => {
  const {dispatch, state: {errMsg}} = useContext(authStore)
  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <View style={styles.container}>
      {/* eslint-disable-next-line no-undef */}
      <Image source={require("../../../assets/icon.png")} style={styles.logo} />
      <TextInput style={styles.input} mode="outlined" label="メールアドレス" value={mail} onChangeText={text => setMail(text)} />
      <TextInput style={styles.input} mode="outlined" label="パスワード" value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} />
      {errMsg !== "" && <Text style={styles.errMsg}>{errMsg}</Text>}
      <Button style={styles.submit} mode="contained" onPress={() => login(dispatch, mail, password)}>ログイン</Button>
      <Text>アカウントをお持ちでない場合 <Text style={styles.signupLink} onPress={() => navigation.navigate("CreateUsername")}>登録はこちら</Text></Text>
    </View>
  )
}
