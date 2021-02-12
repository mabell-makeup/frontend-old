import React, {useContext, useState, useEffect} from "react"
import {View, Image, Platform, TextInput, Text} from "react-native"
import {Button} from "react-native-paper"
import {createPost, postStore} from "../../stores/postStore"
import * as ImagePicker from "expo-image-picker"
import {FakeInput} from "../../components/FakeInput"
import {ScrollView} from "react-native-gesture-handler"
import {TrendKeywordsInput} from "../../components/TrendKeywordsInput"
import {List} from "../../components/List"
import {WheelPicker} from "../../components/WheelPicker"
import {UserInfoList} from "../../components/UserInfoList"
import {authStore} from "../../stores/authStore"

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
  }
}

const onChipPress = (navigation, preTags, post, setPost) => keyword => () => {
  setPost({...post, tags: preTags === "" ? `#${keyword}`: `${preTags} #${keyword}`})
  // navigation.navigate("SelectKeywords")
}

const displayItemsMap = {
  face_type: {label: "顔型", type: "picker"},
  base_color: {label: "ベースカラー(パーソナルカラー)", type: "picker"},
  season: {label: "季節(パーソナルカラー)", type: "picker"},
  skin_type: {label: "肌タイプ", type: "picker"}
}

// eslint-disable-next-line max-lines-per-function
export const SelectImages = ({navigation}) => {
  const {state: {tags}} = useContext(postStore)
  const {state: {user}} = useContext(authStore)
  const initialTmpUser = Object.fromEntries(Object.entries(user).filter(([key]) => Object.keys(displayItemsMap).includes(key)))
  const [tmpUser, setTmpUser] = useState(initialTmpUser)
  const [post, setPost] = useState({...initialTmpUser, products_id: [1, 2], tags: [1, 2]})
  const [pickerState, setPickerState] = useState({isShown: false, items: [], selected: 2})

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!")
        }
      }
    })()
    pickImage()
  }, [])

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    })
    !result.cancelled && setPost(post.img_src_list
      // 既に1枚でも写真が選択されている場合
      ? {...post, img_src_list: Object.assign([], [...post.img_src_list, result.uri])}
      // 写真の選択が初めてだった場合
      : {...post, thumbnail_img_src: result.uri, img_src_list: [result.uri]}
    )
  }

  return (
    <>
      {console.log("POST: ", post)}
      <ScrollView style={styles.container}>
        <View style={styles.captionContainer}>
          {/* eslint-disable-next-line no-undef */}
          <Image source={post.img_src_list ? {uri: post.img_src_list[0]} : require("../../../assets/no_image.png")} style={styles.image} />
          <TextInput onChangeText={text => setPost({...post, description: text})} placeholder="キャプションを書く"/>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>タグ付け</Text>
          <FakeInput navigation={navigation} icon="pound" linkTo="SelectKeywords" placeholder="タグ付け" style={styles.FakeInput} />
          {tags !== "" && <List rows={tags.split(" ").map(tag => ({title: tag, style: styles.listItem}))} />}
          <TrendKeywordsInput onChipPress={onChipPress(navigation, tags, post, setPost)} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>使用アイテム</Text>
          <FakeInput navigation={navigation} icon="pound" linkTo="SelectKeywords" placeholder="使用アイテム" style={styles.FakeInput} />
          {tags !== "" && <List rows={tags.split(" ").map(tag => ({title: tag, style: styles.listItem}))} />}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>ユーザー情報</Text>
          <UserInfoList displayItemsMap={displayItemsMap} handleTmpUser={[tmpUser, setTmpUser]} handleWheelPicker={[pickerState, setPickerState]} />
        </View>
      </ScrollView>
      <WheelPicker usePickerState={[pickerState, setPickerState]} />
      <Button mode="contained" style={styles.button} onPress={() => createPost(post)} disabled={false}>投稿する</Button>
    </>
  )
}
