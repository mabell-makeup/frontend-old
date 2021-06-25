import React, {useState, useEffect} from "react"
import {Button, TextInput, Text} from "react-native-paper"
import {View, StyleSheet, Image} from "react-native"
import {defaultStyle} from "../../styles/defaultStyle"
import {checkLoggedIn, login} from "../../stores/authStore"
import {useDispatch, useSelector} from "react-redux"
import {PasswordInput} from "../../components/PasswordInput"

const styles = StyleSheet.create({
  ...defaultStyle,
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
  signupLink: {
    fontWeight: "bold"
  },
  logo: {
    width: 100,
    height: 100
  },
  errorContainer: {
    width: 300
  },
  errMsg: {
    marginTop: 10,
    color: "red"
  }
})

export const Login = ({navigation}) => {
  const dispatch = useDispatch()
  const err_msg = useSelector(({auth: {err_msg}}) => err_msg)
  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    (async () => {
      await checkLoggedIn(dispatch)
      setIsChecked(true)
    })()
  }, [])

  return (
    <View style={styles.container}>
      {/* eslint-disable-next-line no-undef */}
      <Image source={require("../../../assets/icon.png")} style={styles.logo} />
      {isChecked &&
        <>
          <TextInput style={styles.input} mode="outlined" label="ユーザー名またはメールアドレス" value={mail} onChangeText={text => setMail(text)} />
          <PasswordInput onChangeText={setPassword} error={err_msg} />
          <View style={styles.errorContainer}>{err_msg !== "" && <Text style={styles.errMsg}>{err_msg}</Text>}</View>
          <Button style={styles.submit} contentStyle={styles.buttonContentStyle} mode="contained" onPress={() => login(navigation, dispatch, mail, password, dispatch)}>ログイン</Button>
          <Text>アカウントをお持ちでない場合 <Text style={styles.signupLink} onPress={() => navigation.navigate("RegisterMail")}>登録はこちら</Text></Text>
        </>}
    </View>
  )
}
