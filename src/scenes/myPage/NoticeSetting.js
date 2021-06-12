import React from "react"
import {ScrollView, StyleSheet} from "react-native"
import {Switch} from "react-native-paper"
import {List} from "../../components/List"

const styles = StyleSheet.create({
  container: {
    marginTop: 5
  },
  switch: {
    marginRight: 10
  },
  row: {
    height: 50,
    borderBottomWidth: 0.5,
    borderColor: "#ccc"
  }
})


const settings = [
  {label: "運営からのお知らせ", onPress: () => {}},
  {label: "いいね", onPress: () => {}},
  {label: "コメント", onPress: () => {}},
  {label: "フォロー", onPress: () => {}}
]

const createRows = settings =>
  settings.map(({label, onPress}) => ({
    title: label,
    key: label,
    // eslint-disable-next-line react/display-name
    right: () => <Switch onPress={onPress} style={styles.switch} />,
    style: styles.row
  }))

export const NoticeSetting = () => {
  const rows = createRows(settings)

  return (
    <ScrollView style={styles.container}>
      <List rows={rows} />
    </ScrollView>
  )
}