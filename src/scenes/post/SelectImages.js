import React, {useContext, useState, useEffect} from "react"
import {View, Image, Platform, TextInput, Text} from "react-native"
import {Button} from "react-native-paper"
import {updatePostData, postStore} from "../../stores/postStore"
import * as ImagePicker from "expo-image-picker"
import {FakeInput} from "../../components/FakeInput"
import {ScrollView} from "react-native-gesture-handler"
import {TrendKeywordsInput} from "../../components/TrendKeywordsInput"
import {List} from "../../components/List"
import {WheelPicker} from "../../components/WheelPicker"
import {UserInfoList} from "../../components/UserInfoList"

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

const onChipPress = (navigation, dispatch, preTags) => keyword => () => {
  updatePostData(dispatch, {tags: preTags === "" ? `#${keyword}`: `${preTags} #${keyword}`})
  // navigation.navigate("SelectKeywords")
}

// eslint-disable-next-line max-lines-per-function
export const SelectImages = ({navigation}) => {
  const {dispatch, state: {tags}} = useContext(postStore)
  const [image, setImage] = useState(null)
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

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!")
        }
      }
    })()
    // pickImage()
  }, [])

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    })

    !result.cancelled && setImage(result.uri)
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.captionContainer}>
          <Image source={{uri: image}} style={styles.image} />
          <TextInput placeholder="キャプションを書く"/>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>タグ付け</Text>
          <FakeInput navigation={navigation} icon="pound" linkTo="SelectKeywords" placeholder="タグ付け" style={styles.FakeInput} />
          {tags !== "" && <List rows={tags.split(" ").map(tag => ({title: tag, style: styles.listItem}))} />}
          <TrendKeywordsInput onChipPress={onChipPress(navigation, dispatch, tags)} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>使用アイテム</Text>
          <FakeInput navigation={navigation} icon="pound" linkTo="SelectKeywords" placeholder="使用アイテム" style={styles.FakeInput} />
          {tags !== "" && <List rows={tags.split(" ").map(tag => ({title: tag, style: styles.listItem}))} />}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>ユーザー情報</Text>
          <UserInfoList displayItems={["faceType", "personalColor", "skinType"]} handlePickerState={[pickerState, setPickerState]} />
        </View>
      </ScrollView>
      <WheelPicker usePickerState={[pickerState, setPickerState]} />
      <Button mode="contained" style={styles.button} onPress={() => {}} disabled={false}>投稿する</Button>
    </>
  )
}
