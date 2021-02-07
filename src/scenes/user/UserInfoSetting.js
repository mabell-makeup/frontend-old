import React, {useState} from "react"
import {Text, StyleSheet, View, TextInput, SafeAreaView} from "react-native"
import {ScrollView} from "react-native-gesture-handler"
import {Avatar, Button, Title} from "react-native-paper"
import {UserInfoList} from "../../components/UserInfoList"
import {WheelPicker} from "../../components/WheelPicker"

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginBottom: 80
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
  },
  button: {
    height: 50,
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    justifyContent: "center",
    marginHorizontal: 10
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
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
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
          </View>
        </ScrollView>
      </SafeAreaView>
      <Button mode="contained" style={styles.button} onPress={() => {}} disabled={false}>変更する</Button>
      <WheelPicker usePickerState={[pickerState, setPickerState]} />
    </>
  )
}
