import React, {useContext} from "react"
import {Button, Title} from "react-native-paper"
import {View, StyleSheet, Text} from "react-native"
import {authStore} from "../../stores/authStore"

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
    minHeight: 50,
    minWidth: 280,
    margin: 20,
    justifyContent: "center"
  },
  link: {
    fontWeight: "bold",
    color: "#0099ff"
  },
  linkContainer: {
    marginTop: 5
  }
})

export const SendConfirmationMail = ({navigation}) => {
  const {state: {newUser: {mail}}} = useContext(authStore)

  return (
    <View style={styles.container}>
      <Title>確認メールを送信しました</Title>
      <Text>{mail} へ確認用のメールを送信しました。</Text>
      <Text>メールをご確認いただき、登録を完了してください。</Text>
      <Button style={styles.submit} mode="contained" onPress={() => {}}>ログイン</Button>
      <Text style={styles.linkContainer}>お困りですか？ <Text style={styles.link} onPress={() => navigation.navigate("")}>お問い合わせへ</Text></Text>
      <Text style={styles.linkContainer}>または <Text style={styles.link} onPress={() => navigation.reset({index: 0, routes: [{name: "Login"}]})}>ログイン画面に戻る</Text></Text>
    </View>
  )
}
