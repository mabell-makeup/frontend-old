import React from "react"
import {useState} from "react"
import {StyleSheet, View, ScrollView, TextInput} from "react-native"
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
  right: () => <TextInput style={styles.input} onChangeText={onChangeText} error={error.length > 0} />
}))

const rules = confirm => ([
  R.require,
  R.mail,
  {testFunc: text => text === confirm, message: "メールアドレスが一致しません"}
])

const onSubmit = (dispatch, navigation, setError, password, confirm) => () => {
  const messages = validate(password, rules(confirm))
  setError(messages)
  if (messages.length === 0) {
    navigation.navigate("Settings")
  }
}


// eslint-disable-next-line max-lines-per-function
export const ChangeMail = ({navigation}) => {
  const dispatch = useDispatch()
  const [mailAddress, setMailAddress] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState([])
  const rowData = [
    {title: "新しいメールアドレス", onChangeText: setMailAddress},
    {title: "メールアドレス再確認", onChangeText: setConfirm}
  ]
  const rows = createRows(rowData, error)

  return (
    <>
      <ScrollView style={styles.container}>
        <List rows={rows} />
        <View style={styles.errorMessageContainer}>
          <ErrorMessage messages={error}/>
        </View>
      </ScrollView>
      <Button
        style={styles.button}
        contentStyle={styles.buttonContentStyle}
        mode="contained"
        disabled={mailAddress.length === 0 || confirm.length === 0}
        onPress={onSubmit(dispatch, navigation, setError, mailAddress, confirm)}>
        変更する
      </Button>
    </>
  )
}
