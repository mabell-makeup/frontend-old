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
  {key: "name", label: "名前", data: "だいち"},
  {key: "username", label: "ユーザーネーム", data: "test1"},
  {key: "faceType", label: "顔型", data: "卵型"},
  {key: "personalColor", label: "パーソナルカラー", data: "ブルベ夏"},
  {key: "skinType", label: "肌タイプ", data: "普通肌"},
  {key: "birthdate", label: "生年月日", data: "1999-01-03 (21歳)"},
  {key: "gender", label: "性別", data: "WOMEN"}
]

const UserInfoItem = ({data, pickerState, setPickerState}) =>
  <View style={{justifyContent: "center"}}>
    <Text style={{color: "#666"}} onPress={() => setPickerState({...pickerState, isShown: true})}>{data}</Text>
  </View>

// eslint-disable-next-line max-lines-per-function
export const UserInfoList = ({displayItems=["name","username", "faceType", "personalColor", "skinType", "birthdate", "gender"], pickerState, setPickerState}) => {
  return <List rows={userInfoSample.reduce((accumulator, {key, label, data}) => {
    // eslint-disable-next-line react/display-name
    displayItems.includes(key) && accumulator.push({title: label, right: () => <UserInfoItem {...{data, pickerState, setPickerState}} />, style: styles.listItem})
    return accumulator
  }, [])} />
}
