import React from "react"
import {useState} from "react"
import {StyleSheet, View, ScrollView, Text, TextInput} from "react-native"
import {Button} from "react-native-paper"
import {useDispatch} from "react-redux"
import {ErrorMessage} from "../../components/ErrorMessage"
import {List} from "../../components/List"
import {validate, rules as R} from "../../helper/validateHelper"


const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingTop: 10
  },
  listItem: {
    height: 40,
    borderBottomWidth: 0.5
  },
  title: {
  },
  input: {
    flex: 0.8,
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    height: 30,
    marginRight: 10,
    paddingLeft: 5
  },
  precautionsContainer: {
    paddingLeft: 20,
    justifyContent: "flex-start",
    marginTop: 20
  },
  precautions: {
    marginVertical: 2
  },
  errorMessageContainer: {
    paddingLeft: 20
  },
  button: {
    height: 50,
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    justifyContent: "center",
    marginHorizontal: 10
  },
  buttonContentStyle: {
    height: "100%"
  }
})

const createRows = (rowData, error) => rowData.map(({title, onChangeText}) => ({
  title,
  style: styles.listItem,
  titleStyle: styles.title,
  // eslint-disable-next-line react/display-name
  right: () => <TextInput
    style={styles.input}
    secureTextEntry={true}
    onChangeText={onChangeText}
    error={error.length > 0}
  />
}))

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
    navigation.navigate("Setting")
  }
}


// eslint-disable-next-line max-lines-per-function
export const ChangePassword = ({navigation}) => {
  const dispatch = useDispatch()
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState([])
  const rowData = [
    {title: "現在のパスワード", onChangeText: setPassword},
    {title: "新しいパスワード", onChangeText: setNewPassword},
    {title: "新しいパスワード再確認", onChangeText: setConfirm}
  ]
  const rows = createRows(rowData, error)

  console.log(newPassword)

  return (
    <>
      <ScrollView style={styles.container}>
        <List rows={rows} />
        <View style={styles.precautionsContainer}>
          <Text style={styles.precautions}>パスワードは以下の要件を満たす必要があります</Text>
          <Text style={styles.precautions}>・６文字以上</Text>
          <Text style={styles.precautions}>・記号を含む</Text>
          <Text style={styles.precautions}>・大文字/小文字を含む</Text>
          <Text style={styles.precautions}>・数字を含む</Text>
        </View>
        <View style={styles.errorMessageContainer}>
          <ErrorMessage messages={error}/>
        </View>
      </ScrollView>
      <Button
        style={styles.button}
        contentStyle={styles.buttonContentStyle}
        mode="contained"
        disabled={password.length === 0 || newPassword.length === 0 || confirm.length === 0}
        onPress={onSubmit(dispatch, navigation, setError, newPassword, confirm)}>
        変更する
      </Button>
    </>
  )
}
