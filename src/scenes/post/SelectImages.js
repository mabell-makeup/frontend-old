import React, {useContext, useState, useEffect} from "react"
import {View, Image, Platform, TextInput, Text} from "react-native"
import {Button, Checkbox} from "react-native-paper"
import {createPost, fetchTrendTags, postStore, updateTmpPost, updateTmpTags} from "../../stores/postStore"
import * as ImagePicker from "expo-image-picker"
import {FakeInput} from "../../components/FakeInput"
import {ScrollView} from "react-native-gesture-handler"
import {List} from "../../components/List"
import {WheelPicker} from "../../components/WheelPicker"
import {UserInfoList} from "../../components/UserInfoList"
import {authStore, updateUser} from "../../stores/authStore"
import {ChipList} from "../../components/ChipList"
import {pickImage, createS3Client, uploadImage} from "../../helper/imageHelper"
import {Auth} from "aws-amplify"

const styles = {
  container: {
    paddingTop: 10,
    paddingHorizontal: 20,
    height: "100%"
  },
  captionContainer: {
    flexDirection: "row"
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: "#999"
  },
  FakeInput: {
    height: 35
  },
  listItem: {
    height: 40,
    borderBottomWidth: 0.5
  },
  inputContainer: {
    marginTop: 20
  },
  label: {
    fontWeight: "bold",
    marginBottom: 10
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
  checkbox: {
    backgroundColor: "#eee",
    borderRadius: 50,
    marginRight: 10
  },
  userInfoUpdate: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center"
  }
}

const displayItemsMap = {
  face_type: {label: "顔型", type: "picker"},
  base_color: {label: "ベースカラー(パーソナルカラー)", type: "picker"},
  season: {label: "季節(パーソナルカラー)", type: "picker"},
  skin_type: {label: "肌タイプ", type: "picker"}
}

const registerPost = async (tmpPost) => {
  // TODO: こっちで書き換える
  // https://docs.amplify.aws/lib/storage/getting-started/q/platform/js#using-amazon-s3
  const uri = await uploadImage(tmpPost.thumbnail_img_src)
  createPost({...tmpPost, thumbnail_img_src: uri})
}

const onSubmit = (tmpPost, willUpdate, dispatch, tmpUser) => () => {
  registerPost(tmpPost)
  willUpdate && updateUser(dispatch, tmpUser)
}

const createTags = (dispatch, tags) => tags.map(tag => ({
  label: `#${tag.tag_name}`,
  onPress: () => {updateTmpTags(dispatch, tag.tag_name)}
}))

// eslint-disable-next-line max-lines-per-function
export const SelectImages = ({navigation}) => {
  const {dispatch: postDispatch, state: {tmpPost, suggestionTags}} = useContext(postStore)
  const {dispatch, state: {user}} = useContext(authStore)
  const initialTmpUser = Object.fromEntries(Object.entries(user).filter(([key]) => Object.keys(displayItemsMap).includes(key)))
  const [tmpUser, setTmpUser] = useState({...initialTmpUser, name: user.name, nickname: user.nickname})
  const [pickerState, setPickerState] = useState({isShown: false, items: [], selected: 2})
  const [willUpdate, setWillUpdate] = useState(true)
  const trendTags = createTags(postDispatch, suggestionTags)

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!")
        }
      }
    })()
    pickImage(onPickSuccess)
    updateTmpPost(postDispatch, initialTmpUser)
    fetchTrendTags(postDispatch)
  }, [])

  const onPickSuccess = result => !result.cancelled && updateTmpPost(postDispatch, tmpPost.img_src_list
    // 既に1枚でも写真が選択されている場合
    ? {img_src_list: Object.assign([], [...tmpPost.img_src_list, result.uri])}
    // 写真の選択が初めてだった場合
    : {thumbnail_img_src: result.uri, img_src_list: [result.uri]}
  )


  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.captionContainer}>
          {/* eslint-disable-next-line no-undef */}
          <Image source={tmpPost.img_src_list ? {uri: tmpPost.img_src_list[0]} : require("../../../assets/no_image.png")} style={styles.image} />
          <TextInput onChangeText={text => updateTmpPost(postDispatch, {description: text})} placeholder="キャプションを書く"/>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>タグ付け</Text>
          <FakeInput navigation={navigation} icon="pound" linkTo="SelectTags" placeholder="タグ付け" style={styles.FakeInput} />
          {tmpPost.tags !== "" && <List rows={tmpPost.tags.map(tag => ({title: tag, style: styles.listItem}))} />}
          <ChipList items={trendTags} />
          {/* <TrendKeywordsInput onChipPress={onChipPress(navigation, tmpPost.tags, updateTmpPost, postDispatch)} /> */}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>使用アイテム</Text>
          <FakeInput navigation={navigation} icon="pound" linkTo="SelectTags" placeholder="使用アイテム" style={styles.FakeInput} />
          {tmpPost.tags !== "" && <List rows={tmpPost.tags.map(tag => ({title: tag, style: styles.listItem}))} />}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>ユーザー情報</Text>
          <UserInfoList displayItemsMap={displayItemsMap} handleTmpUser={[tmpUser, setTmpUser]} handleWheelPicker={[pickerState, setPickerState]} />
        </View>
        <View style={styles.userInfoUpdate}>
          <View style={styles.checkbox}>
            <Checkbox
              status={willUpdate ? "checked" : "unchecked"}
              color="#000"
              onPress={() => setWillUpdate(!willUpdate)}
            />
          </View>
          <Text>ユーザー情報を更新する</Text>
        </View>
      </ScrollView>
      <WheelPicker usePickerState={[pickerState, setPickerState]} />
      <Button mode="contained" style={styles.button} contentStyle={styles.buttonContentStyle} onPress={() => onSubmit(tmpPost, willUpdate, dispatch, tmpUser)()} disabled={false}>投稿する</Button>
    </>
  )
}
