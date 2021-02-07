import React from "react"
import {View, Text} from "react-native"
import {List} from "../components/List"

const styles = {
  listItem: {
    height: 40,
    borderBottomWidth: 0.5
  }
}

const userInfoSample = [
  {label: "顔型", data: "卵型"},
  {label: "パーソナルカラー", data: "ブルベ夏"},
  {label: "肌タイプ", data: "普通肌"},
  {label: "生年月日", data: "1999-01-03 (21歳)"},
  {label: "性別", data: "WOMEN"}
]

const UserInfoItem = ({data, pickerState, setPickerState}) =>
  <View style={{justifyContent: "center"}}>
    <Text style={{color: "#666"}} onPress={() => setPickerState({...pickerState, isShown: true})}>{data}</Text>
  </View>

// eslint-disable-next-line max-lines-per-function
export const UserInfoList = ({pickerState, setPickerState}) => {
  return <List rows={userInfoSample.map(({label, data}) => ({title: label, right: () => <UserInfoItem {...{data, pickerState, setPickerState}} />, style: styles.listItem}))} />
}
