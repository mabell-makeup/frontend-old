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
  }
})

export const Login = ({navigation}) => {
  const {dispatch} = useContext(authStore)
  const [mail, setMail] = useState("")
  const [pwd, setPwd] = useState("")

  return (
    <View style={styles.container}>
      {/* eslint-disable-next-line no-undef */}
      <Image source={require("../../../assets/icon.png")} style={styles.logo} />
      <TextInput style={styles.input} mode="outlined" label="メールアドレス" value={mail} onChangeText={text => setMail(text)} />
      <TextInput style={styles.input} mode="outlined" label="パスワード" value={pwd} onChangeText={text => setPwd(text)} secureTextEntry={true} />
      <Button style={styles.submit} mode="contained" onPress={() => login(dispatch, "testuser", "p@$$W0rd", "test@example.com", "nickname", "men", "1999-01-13")}>ログイン</Button>
      <Text>アカウントをお持ちでない場合 <Text style={styles.signupLink} onPress={() => navigation.navigate("Signup")}>登録はこちら</Text></Text>
    </View>
  )
}
