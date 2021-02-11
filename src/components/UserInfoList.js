import React, {useContext} from "react"
import {View, Text, TextInput} from "react-native"
import {List} from "../components/List"
import {authStore} from "../stores/authStore"

const styles = {
  listItem: {
    height: 40,
    borderBottomWidth: 0.5
  },
  textInput: {
    minWidth: 70,
    textAlign: "right"
  }
}

const userInfoSample = [
  {key: "name", label: "名前", value: "だいち"},
  {key: "username", label: "ユーザーネーム", value: "test1"},
  {key: "faceType", label: "顔型", value: "卵型"},
  {key: "personalColor", label: "パーソナルカラー", value: "ブルベ夏"},
  {key: "skinType", label: "肌タイプ", value: "普通肌"},
  {key: "birthdate", label: "生年月日", value: "1999-01-03 (21歳)"},
  {key: "gender", label: "性別", value: "WOMEN"}
]

const UserInfoItem = ({value, type, handleState}) => {
  const [state, setState] = handleState

  return (
    <View style={{justifyContent: "center"}}>
      {type === "text"
        ? <TextInput defaultValue={value ? value : "未入力"} color="#666" style={styles.textInput} />
        : <Text style={{color: "#666"}} onPress={() => setState({...state, isShown: true})}>{value ? value : "未入力"}</Text>
      }
    </View>
  )
}

// ここにあるもののうち、displayItemsと一致したものが表示される
const displayItemsMap = {
  name: {label: "名前", type: "text"}, 
  username: {label: "ユーザー名", type: "text"},
  faceType: {label: "顔型", type: "picker"},
  personalColor: {label: "パーソナルカラー", type: "picker"},
  skinType: {label: "肌タイプ", type: "picker"},
  birthdate: {label: "生年月日", type: "date"},
  gender: {label: "性別", type: "picker"}
}

// eslint-disable-next-line max-lines-per-function
export const UserInfoList = ({displayItems=["name", "username", "faceType", "personalColor", "skinType", "birthdate", "gender"], handlePickerState=[{}, ()=>{}], handleDatePickerState=[{}, ()=>{}]}) => {
  const {state: {user}} = useContext(authStore)
  return <List rows={Object.entries(user).reduce((accumulator, [key, value]) => {
    console.log(accumulator, [key, value])
    if(!displayItems.includes(key)) return accumulator
    const handleState = displayItemsMap[key].type === "picker" ? handlePickerState : displayItemsMap[key].type === "date" ? handleDatePickerState : [{}, ()=>{}]
    // eslint-disable-next-line react/display-name
    accumulator.push({title: displayItemsMap[key].label, right: () => <UserInfoItem {...{value, type: displayItemsMap[key].type, handleState}} />, style: styles.listItem})
    return accumulator
  }, [])} />
}
