import React, {useState} from "react"
import {Text, StyleSheet, View, TextInput} from "react-native"
import {ScrollView} from "react-native-gesture-handler"
import {Avatar, Title} from "react-native-paper"
import {UserInfoList} from "../../components/UserInfoList"
import {WheelPicker} from "../../components/WheelPicker"

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 12
  },
  imageContainer: {
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
  }
})

const sampleSelfIntroduction = `@sample413 eyelist
📍Shimokitazawa
ㅤㅤ
ご予約 / お問い合わせは
Coolpepper↓
https://beauty.coolpepper.jp/kr/hogehoge/staff/W0001`


// eslint-disable-next-line max-lines-per-function
export const UserInfoSetting = ({navigation}) => {
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
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Avatar.Image size={90} />
          <Text style={styles.selectImage}>プロフィール写真を変更</Text>
        </View>
        <View style={styles.userInfoContainer}>
          <Title>自己紹介</Title>
          <TextInput placeholder="自己紹介" defaultValue={sampleSelfIntroduction} multiline={true} />
        </View>
        <View style={styles.userInfoContainer}>
          <Title>基本情報</Title>
          <UserInfoList pickerState={pickerState} setPickerState={setPickerState} />
        </View>
      </ScrollView>
      <WheelPicker usePickerState={[pickerState, setPickerState]} />
    </>
  )
}
