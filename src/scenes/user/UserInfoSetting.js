import React, {useState, useContext} from "react"
import {Text, StyleSheet, View, TextInput, SafeAreaView} from "react-native"
import {ScrollView} from "react-native-gesture-handler"
import {Avatar, Button, Title} from "react-native-paper"
import {WheelPicker} from "../../components/WheelPicker"
import {authStore, logout} from "../../stores/authStore"
import {List} from "../../components/List"

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginBottom: 80
  },
  toCenter: {
    marginTop: 5,
    alignItems: "center"
  },
  selectImage: {
    fontWeight: "bold",
    color: "#0099ff",
    marginTop: 5
  },
  userInfoContainer: {
    marginTop: 40
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
  logout: {
    fontWeight: "bold",
    color: "#0099ff",
    marginTop: 30
  },
  listItem: {
    height: 40,
    borderBottomWidth: 0.5
  },
  textInput: {
    minWidth: 70,
    textAlign: "right"
  }
})

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

const UserInfoList = ({displayItems=["name", "username", "faceType", "personalColor", "skinType", "birthdate", "gender"], handlePickerState=[{}, ()=>{}], handleDatePickerState=[{}, ()=>{}]}) => {
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


const sampleSelfIntroduction = `@sample413 eyelist
📍Shimokitazawa
ㅤㅤ
ご予約 / お問い合わせは
Coolpepper↓
https://beauty.coolpepper.jp/kr/hogehoge/staff/W0001`


// eslint-disable-next-line max-lines-per-function
export const UserInfoSetting = ({navigation}) => {
  const {dispatch, state: {user}} = useContext(authStore)
  const [pickerState, setPickerState] = useState({
    isShown: false,
    items: [
      {label: "テスト0", value: 0},
      {label: "テスト1", value: 1},
      {label: "テスト2", value: 2},
      {label: "テスト3", value: 3},
      {label: "テスト4", value: 4}
    ],
    selected: 2
  })

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.toCenter}>
              <Avatar.Image size={90} />
              <Text style={styles.selectImage}>プロフィール写真を変更</Text>
            </View>
            <View style={styles.userInfoContainer}>
              <Title>自己紹介</Title>
              <TextInput placeholder="自己紹介" defaultValue={sampleSelfIntroduction} multiline={true} />
            </View>
            <View style={styles.userInfoContainer}>
              <Title>基本情報</Title>
              <UserInfoList handlePickerState={[pickerState, setPickerState]} />
            </View>
            <View style={styles.toCenter}>
              <Text onPress={() => logout(dispatch)} style={styles.logout}>ログアウト</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Button mode="contained" style={styles.button} onPress={() => {}} disabled={false}>変更する</Button>
      <WheelPicker usePickerState={[pickerState, setPickerState]} />
    </>
  )
}
