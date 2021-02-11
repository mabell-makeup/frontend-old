import React, {useState, useContext} from "react"
import {Text, StyleSheet, View, TextInput, SafeAreaView} from "react-native"
import {ScrollView} from "react-native-gesture-handler"
import {Avatar, Button, Title} from "react-native-paper"
import {WheelPicker} from "../../components/WheelPicker"
import {authStore, logout, updateUser} from "../../stores/authStore"
import {List} from "../../components/List"
import {appStore} from "../../stores/appStore"
import {parseMasterData} from "../../helper/requestHelper"

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

const UserInfoItem = ({value, type, onPress, onChange}) => {
  return (
    <View style={{justifyContent: "center"}}>
      {type === "text"
        ? <TextInput defaultValue={value} placeholder="未入力" color="#666" style={styles.textInput} onChangeText={onChange} />
        : <Text style={{color: "#666"}} onPress={onPress}>{value ? value : "未選択"}</Text>
      }
    </View>
  )
}

const displayItemsMap = {
  nickname: {label: "表示名", type: "text"}, 
  name: {label: "ユーザー名", type: "text"},
  face_type: {label: "顔型", type: "picker"},
  base_color: {label: "ベースカラー", type: "picker"},
  season: {label: "季節", type: "picker"},
  skin_type: {label: "肌タイプ", type: "picker"},
  birthdate: {label: "生年月日", type: "date"},
  gender: {label: "性別", type: "text"}
}

const UserInfoList = ({handleTmpUser: [tmpUser, setTmpUser], handleWheelPicker=[{}, ()=>{}], handleDatePicker=[{}, ()=>{}]}) => {
  const {state: {masterData}} = useContext(appStore)

  return <List rows={Object.entries(tmpUser).reduce((accumulator, [key, value]) => {
    if(!Object.keys(displayItemsMap).includes(key)) return accumulator
    const choices = displayItemsMap[key].type === "picker" ? parseMasterData(masterData, key): []
    const [state, setState] = displayItemsMap[key].type === "picker" ? handleWheelPicker : displayItemsMap[key].type === "date" ? handleDatePicker : [{}, ()=>{}]
    accumulator.push({title: displayItemsMap[key].label, style: styles.listItem,
      // eslint-disable-next-line react/display-name
      right: () => 
        <UserInfoItem
          key={key}
          value={value}
          type={displayItemsMap[key].type}
          onChange={value => setTmpUser({...tmpUser, [key]: value})}
          onPress={() => setState({...state, isShown: true, choices})}
        />
    })
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
  const [pickerState, setPickerState] = useState({isShown: false, choices: [], selected: 2})
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
              <TextInput placeholder="自己紹介" defaultValue={sampleSelfIntroduction} multiline={true} />
            </View>
            <View style={styles.userInfoContainer}>
              <Title>基本情報</Title>
              <UserInfoList handleTmpUser={[tmpUser, setTmpUser]} handleWheelPicker={[pickerState, setPickerState]} />
            </View>
            <View style={styles.toCenter}>
              <Text onPress={() => logout(dispatch)} style={styles.logout}>ログアウト</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Button mode="contained" style={styles.button} onPress={() => updateUser(dispatch, tmpUser)} disabled={false}>変更する</Button>
      <WheelPicker usePickerState={[pickerState, setPickerState]} />
    </>
  )
}
