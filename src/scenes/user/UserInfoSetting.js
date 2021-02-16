import React, {useState, useContext} from "react"
import {Text, StyleSheet, View, TextInput, SafeAreaView} from "react-native"
import {ScrollView} from "react-native-gesture-handler"
import {Avatar, Button, Title} from "react-native-paper"
import {DatePicker} from "../../components/DatePicker"
import {UserInfoList} from "../../components/UserInfoList"
import {WheelPicker} from "../../components/WheelPicker"
import {authStore, logout, updateUser} from "../../stores/authStore"

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
  buttonContentStyle: {
    height: "100%"
  },
  logout: {
    fontWeight: "bold",
    color: "#0099ff",
    marginTop: 30
  }
})

const displayItemsMap = {
  nickname: {label: "表示名", type: "text"}, 
  name: {label: "ユーザー名", type: "text"},
  face_type: {label: "顔型", type: "picker"},
  base_color: {label: "ベースカラー(パーソナルカラー)", type: "picker"},
  season: {label: "季節(パーソナルカラー)", type: "picker"},
  skin_type: {label: "肌タイプ", type: "picker"},
  birthdate: {label: "生年月日", type: "date"},
  gender: {label: "性別", type: "text"}
}

// eslint-disable-next-line max-lines-per-function
export const UserInfoSetting = ({navigation}) => {
  const {dispatch, state: {user}} = useContext(authStore)
  const [pickerState, setPickerState] = useState({isShown: false, choices: [], selected: ""})
  const [dtPickerState, setDTPickerState] = useState({isShown: false, selected: new Date(user.birthdate)})
  const [tmpUser, setTmpUser] = useState(Object.fromEntries(Object.entries(user).filter(([key]) => Object.keys(displayItemsMap).includes(key))))

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.toCenter}>
              {/* eslint-disable-next-line no-undef */}
              <Avatar.Image size={90} source={user.thumbnail_img_src !== "" ? {uri: user.thumbnail_img_src} : require("../../../assets/no_image.png")} />
              <Text style={styles.selectImage}>プロフィール写真を変更</Text>
            </View>
            <View style={styles.userInfoContainer}>
              <Title>自己紹介</Title>
              <TextInput placeholder="自己紹介" defaultValue={user.self_introduction} multiline={true} />
            </View>
            <View style={styles.userInfoContainer}>
              <Title>基本情報</Title>
              <UserInfoList displayItemsMap={displayItemsMap} handleTmpUser={[tmpUser, setTmpUser]} handleWheelPicker={[pickerState, setPickerState]} handleDatePicker={[dtPickerState, setDTPickerState]} />
            </View>
            <View style={styles.toCenter}>
              <Text onPress={() => logout(dispatch)} style={styles.logout}>ログアウト</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Button mode="contained" style={styles.button} contentStyle={styles.buttonContentStyle} onPress={() => updateUser(dispatch, tmpUser)} disabled={false}>変更する</Button>
      <WheelPicker usePickerState={[pickerState, setPickerState]} onChange={itemValue => setTmpUser({...tmpUser, ...itemValue})} />
      <DatePicker usePickerState={[dtPickerState, setDTPickerState]} onChange={selectedDate => setTmpUser({...tmpUser, birthdate: selectedDate})} />
    </>
  )
}
