import React, {useContext, useState} from "react"
import {Button, Title, TextInput} from "react-native-paper"
import {View, StyleSheet, Text} from "react-native"
import {authStore, confirmSignup, resendConfirmMail} from "../../stores/authStore"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    marginTop: 20,
    justifyContent: "center"
  },
  buttonContentStyle: {
    height: "100%"
  },
  link: {
    fontWeight: "bold",
    color: "#0099ff"
  },
  resendLink: {
    marginTop: 10
  },
  contactLink: {
    marginTop: 30
  }
})

const onChange = setCode => text => setCode(text)


export const SendConfirmationMail = ({navigation}) => {
  const {dispatch, state: {new_user: {email, name, password}}} = useContext(authStore)
  const [code, setCode] = useState("")

  return (
    <View style={styles.container}>
      <Title>確認メールを送信しました</Title>
      <Text>{email} へ確認コードを送信しました。お使いの電子メールアドレスであることを確認するために、確認コードを入力してください。</Text>
      <TextInput style={styles.input} mode="outlined" label="確認コード" onChangeText={onChange(setCode)} />
      <Button style={styles.submit} contentStyle={styles.buttonContentStyle} mode="contained" onPress={() => confirmSignup(dispatch, code, name, password, navigation)}>次へ</Button>
      <Text style={styles.resendLink}><Text style={styles.link} onPress={() => resendConfirmMail(name, navigation)}>確認コードを再送する</Text></Text>
      <Text style={styles.contactLink}>お困りですか？ <Text style={styles.link} onPress={() => navigation.navigate("")}>お問い合わせへ</Text></Text>
    </View>
  )
}
