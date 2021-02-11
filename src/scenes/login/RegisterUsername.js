import React, {useContext} from "react"
import {Button, TextInput, Title} from "react-native-paper"
import {View, StyleSheet} from "react-native"
import {authStore, updateNewUser} from "../../stores/authStore"

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
  }
})

export const RegisterUsername = ({navigation}) => {
  const {dispatch} = useContext(authStore)

  // TODO: 必須入力と重複不可のバリデーションを追加

  return (
    <View style={styles.container}>
      <Title>ユーザー名を作成</Title>
      <TextInput style={styles.input} mode="outlined" label="ユーザー名" onChangeText={text => updateNewUser(dispatch, {name: text})} />
      <Button style={styles.submit} mode="contained" onPress={() => navigation.navigate("RegisterPassword")}>次へ</Button>
    </View>
  )
}
