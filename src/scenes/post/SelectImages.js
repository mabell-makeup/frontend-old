import React, {useContext, useState, useEffect} from "react"
import {View, Image, Platform, TextInput, Text} from "react-native"
import {Button, Checkbox, IconButton} from "react-native-paper"
import {createPost, fetchTrendProducts, fetchTrendTags, postStore, updateTmpPost, updateTmpProducts, updateTmpTags} from "../../stores/postStore"
import * as ImagePicker from "expo-image-picker"
import {FakeInput} from "../../components/FakeInput"
import {ScrollView} from "react-native-gesture-handler"
import {List} from "../../components/List"
import {WheelPicker} from "../../components/WheelPicker"
import {UserInfoList} from "../../components/UserInfoList"
import {authStore, updateUser} from "../../stores/authStore"
import {ChipList} from "../../components/ChipList"
import {pickImage, uploadImage} from "../../helper/imageHelper"
import {ColorPaletteInput} from "./ColorPaletteInput"
import {MakeUpCategoryInput} from "./MakeUpCategoryInput"
import {CountryInput} from "./CountryInput"
import {addError, appStore} from "../../stores/appStore"
import {WINDOW_WIDTH} from "../../styles/constants"
import {TextWithImportantLabel} from "../../components/TextWithImportantLabel"
import {rules, validate} from "../../helper/validateHelper"
import {ErrorMessage} from "../../components/ErrorMessage"

const styles = {
  container: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 120,
    height: "100%"
  },
  descriptionContainer: {
    flexDirection: "row"
  },
  description: {
    width: WINDOW_WIDTH - 120, // 画像のwidthとpaddingの長さを引く
    paddingHorizontal: 10
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
    marginTop: 30
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

const registerPost = async (tmpPost, appDispatch) => {
  // TODO: こっちで書き換える
  // https://docs.amplify.aws/lib/storage/getting-started/q/platform/js#using-amazon-s3
  try {
    const thumbnailUri = await uploadImage(tmpPost.thumbnail_img_src)
    const uriList = await Promise.all(tmpPost.img_src_list.map(async src => await uploadImage(src)))
    const {products, ...post} = await tmpPost
    createPost({...post, thumbnail_img_src: thumbnailUri, img_src_list: uriList, products_id: products.map(p => p.product_id)})
  } catch (error) {
    addError(appDispatch, {errorType: "CREATE_POST_ERROR", message: "投稿に失敗しました。"})
  }
}

const onSubmit = (tmpPost, willUpdate, dispatch, tmpUser, navigation, appDispatch, setDescriptionError, setProductError) => () => {
  const descriptionError = validate(tmpPost.description, [{testFunc: rules.require.testFunc, message: "キャプションを入力してください"}])
  const productError = validate(tmpPost.products, [{testFunc: rules.require.testFunc, message: "使用アイテムを選択してください"}])
  setDescriptionError(descriptionError)
  setProductError(productError)
  if (descriptionError.length === 0 && productError.length === 0) {
    registerPost(tmpPost, appDispatch)
    willUpdate && updateUser(dispatch, tmpUser)
    navigation.goBack()
  }
}

const createTrendTags = (dispatch, preTags, tags) => tags.map(tag => ({
  label: `#${tag.tag_name}`,
  onPress: () => updateTmpTags(dispatch, preTags, tag.tag_name)
}))

const createTrendProducts = (dispatch, preProducts, products) => products.map(product => ({
  label: `#${product.product_name}`,
  onPress: () => updateTmpProducts(dispatch, preProducts, product)
}))

// eslint-disable-next-line max-lines-per-function
export const SelectImages = ({navigation}) => {
  const {dispatch: postDispatch, state: {tmpPost, suggestionTags, suggestionProducts}} = useContext(postStore)
  const {dispatch: appDispatch} = useContext(appStore)
  const {dispatch, state: {user}} = useContext(authStore)
  const initialTmpUser = {...Object.fromEntries(Object.entries(user).filter(([key]) => Object.keys(displayItemsMap).includes(key))), gender: user.gender}
  const [tmpUser, setTmpUser] = useState({...initialTmpUser, name: user.name, nickname: user.nickname})
  const [pickerState, setPickerState] = useState({isShown: false, choices: [], selected: ""})
  const [willUpdate, setWillUpdate] = useState(true)
  const [descriptionError, setDescriptionError] = useState([])
  const [productError, setProductError] = useState([])
  const trendTags = createTrendTags(postDispatch, tmpPost.tags, suggestionTags)
  const trendProducts = createTrendProducts(postDispatch, tmpPost.products, suggestionProducts)

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!")
        }
      }
    })()
    pickImage(onPickSuccess, () => navigation.goBack())
    updateTmpPost(postDispatch, tmpPost, initialTmpUser)
    fetchTrendTags(postDispatch)
    fetchTrendProducts(postDispatch)
  }, [])

  const onPickSuccess = result => updateTmpPost(postDispatch, tmpPost, tmpPost.img_src_list
    // 既に1枚でも写真が選択されている場合
    ? {img_src_list: Object.assign([], [...tmpPost.img_src_list, result.uri])}
    // 写真の選択が初めてだった場合
    : {thumbnail_img_src: result.uri, img_src_list: [result.uri]}
  )


  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.descriptionContainer}>
            {/* eslint-disable-next-line no-undef */}
            <Image source={tmpPost.img_src_list ? {uri: tmpPost.img_src_list[0]} : require("../../../assets/no_image.png")} style={styles.image} />
            <TextInput style={styles.description} onChangeText={text => updateTmpPost(postDispatch, tmpPost, {description: text}, false)} placeholder="キャプションを書く(必須)" multiline={true} />
          </View>
          <ErrorMessage messages={descriptionError} />
          <View style={styles.inputContainer}>
            <Text style={styles.label}>カテゴリを選ぶ</Text>
            <MakeUpCategoryInput />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>色を選ぶ</Text>
            <ColorPaletteInput />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>国を選ぶ</Text>
            <CountryInput />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>タグ付け</Text>
            <FakeInput navigation={navigation} icon="pound" linkTo="SelectTags" placeholder="タグ付け" style={styles.FakeInput} />
            {tmpPost.tags !== "" && <List rows={tmpPost.tags.map(tag => ({title: tag, style: styles.listItem, right: () => <IconButton icon="close" onPress={() => updateTmpTags(postDispatch, tmpPost.tags, tag)} />}))} />}
            <ChipList items={trendTags} />
          </View>
          <View style={styles.inputContainer}>
            <TextWithImportantLabel label="必須">使用アイテム</TextWithImportantLabel>
            <FakeInput navigation={navigation} icon="pound" linkTo="SelectProducts" placeholder="使用アイテム" style={styles.FakeInput} />
            {tmpPost.products !== "" && <List rows={tmpPost.products.map(product => ({title: product.product_name, style: styles.listItem}))} />}
            <ErrorMessage messages={productError} />
            <ChipList items={trendProducts} />
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
        </View>
      </ScrollView>
      <WheelPicker usePickerState={[pickerState, setPickerState]} onChange={itemValue => setTmpUser({...tmpUser, ...itemValue})} />
      <Button mode="contained" style={styles.button} contentStyle={styles.buttonContentStyle} onPress={onSubmit(tmpPost, willUpdate, dispatch, tmpUser, navigation, appDispatch, setDescriptionError, setProductError)} disabled={false}>投稿する</Button>
    </>
  )
}
