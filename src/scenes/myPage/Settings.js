import React from "react"
import {ScrollView, StyleSheet, Text, View} from "react-native"
import {useDispatch, useSelector} from "react-redux"
import {List} from "../../components/List"
import {openContactPage} from "../../helper/contactHelper"
import {logout} from "../../stores/authStore"

const styles = StyleSheet.create({
  container: {
    marginTop: 5
  },
  toCenter: {
    marginTop: 5,
    alignItems: "center"
  },
  link: {
    fontWeight: "bold",
    color: "#0099ff",
    marginTop: 30
  }
})


const settings = [
  {label: "プロフィール設定", linkTo: "UserInfoSetting"},
  {label: "パスワード変更", linkTo: "ChangePassword"},
  {label: "通知設定", linkTo: "NoticeSetting"},
  {label: "利用規約", linkTo: "TermsOfService"},
  {label: "プライバシーポリシー", linkTo: "PrivacyPolicy"}
]

const createRows = (navigation, settings) =>
  settings.map(({label, linkTo}) => ({
    title: label,
    key: linkTo,
    onPress: () => navigation.navigate(linkTo),
    style: {height: 50, borderBottomWidth: 0.5, borderColor: "#ccc"}
  }))

export const Settings = ({navigation}) => {
  const rows = createRows(navigation, settings)
  const dispatch = useDispatch()
  const user = useSelector(({auth: {user}}) => user)


  return (
    <ScrollView style={styles.container}>
      <List rows={rows} />
      <View style={styles.toCenter}>
        <Text onPress={() => openContactPage(user.name, user.email)} style={styles.link}>お問い合わせ</Text>
      </View>
      <View style={styles.toCenter}>
        <Text onPress={() => logout(dispatch)} style={styles.link}>ログアウト</Text>
      </View>
    </ScrollView>
  )
}