// TODO: FIX IT!!!!
/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
import React, {useState, useEffect} from "react"
import {View, Image, Platform, TextInput, Text, TouchableOpacity} from "react-native"
import {Button, Checkbox, IconButton} from "react-native-paper"
import {createPost, resetTmpPost, updateTmpPost, updateTmpProducts, updateTmpTags} from "../../stores/postStore"
import * as ImagePicker from "expo-image-picker"
import {FakeInput} from "../../components/FakeInput"
import {ScrollView} from "react-native-gesture-handler"
import {List} from "../../components/List"
import {WheelPicker} from "../../components/WheelPicker"
import {UserInfoList} from "../../components/UserInfoList"
import {updateUser} from "../../stores/authStore"
import {ChipList} from "../../components/ChipList"
import {pickImage, compressImage} from "../../helper/imageHelper"
import {ColorPaletteInput} from "../../components/ColorPaletteInput"
import {MakeUpCategoryInput} from "../../components/MakeUpCategoryInput"
import {CountryInput} from "../../components/CountryInput"
import {addError, fetchTrendTags, fetchTrendProducts} from "../../stores/appStore"
import {TextWithImportantLabel} from "../../components/TextWithImportantLabel"
import {rules, validate} from "../../helper/validateHelper"
import {ErrorMessage} from "../../components/ErrorMessage"
import {Loading} from "../../components/Loading"
import {useDispatch, useSelector} from "react-redux"
import {IconLabel} from "../../components/IconLabel"
import {primary} from "../../styles/colors"

const styles = {
  container: {
    paddingTop: 20,
    paddingHorizontal: 10,
    paddingBottom: 120,
    height: "100%"
  },
  description: {
    minHeight: 50
  },
  imageContainer: {
    paddingVertical: 10
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 15,
    borderWidth: 0.5,
    borderColor: "#999",
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center"
  },
  deleteImageButton: {
    position: "absolute",
    backgroundColor: "rgba(200, 200, 200, 0.8)",
    right: 0,
    top: -15,
    borderWidth: 0.5,
    borderColor: "#999"
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

const registerPost = async (tmpPost, user_id, dispatch) => {
  try {
    const thumbnailImg = await compressImage(tmpPost.thumbnail_img, 1, {width: 300, height: 300})
    const imgList = await Promise.all(tmpPost.img_src_list.map(async src => await compressImage(src, 0.6, {width: 1080, height: 1080})))
    // TODO: 後で書き方を直す
    const {products, thumbnail_img, img_src_list, ...post} = await tmpPost
    createPost({...post, thumbnail_img: thumbnailImg, img_list: imgList, product_id: products.map(p => p.product_id)}, user_id)
  } catch (error) {
    addError(dispatch, {errorType: "CREATE_POST_ERROR", message: "投稿に失敗しました。"})
  }
}

const onSubmit = (tmpPost, willUpdate, dispatch, tmpUser, navigation, setDescriptionError, setProductError, setIsLoading, user_id) => async () => {
  const descriptionError = validate(tmpPost.description, [{testFunc: rules.require.testFunc, message: "キャプションを入力してください"}])
  const productError = validate(tmpPost.products, [{testFunc: rules.require.testFunc, message: "使用アイテムを選択してください"}])
  setDescriptionError(descriptionError)
  setProductError(productError)
  if (descriptionError.length === 0 && productError.length === 0) {
    setIsLoading(true)
    await registerPost(tmpPost, user_id, dispatch)
    willUpdate && await updateUser(dispatch, tmpUser, user_id)
    setTimeout(() => {
      setIsLoading(false)
      navigation.goBack()
    }, 3000)
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

// eslint-disable-next-line max-statements
export const SelectImages = ({navigation}) => {
  const dispatch = useDispatch()
  const {tmpPost, suggestionTags, suggestionProducts, user} = useSelector(({
    post: {tmpPost}, app: {suggestionTags, suggestionProducts}, auth: {user}
  }) => ({tmpPost, suggestionTags, suggestionProducts, user}))
  const initialTmpUser = {...Object.fromEntries(Object.entries(user).filter(([key]) => Object.keys(displayItemsMap).includes(key))), gender: user.gender}
  const [tmpUser, setTmpUser] = useState({...initialTmpUser, name: user.name, nickname: user.nickname})
  const [pickerState, setPickerState] = useState({isShown: false, choices: [], selected: ""})
  const [willUpdate, setWillUpdate] = useState(false)
  const [descriptionError, setDescriptionError] = useState([])
  const [productError, setProductError] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const trendTags = createTrendTags(dispatch, tmpPost.tags, suggestionTags)
  const trendProducts = createTrendProducts(dispatch, tmpPost.products, suggestionProducts)

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== "granted") {
          alert("写真へのアクセス許可がありません。\n設定から写真へのアクセスを許可してください。")
        }
      }
    })()
    resetTmpPost(dispatch, initialTmpUser)
    fetchTrendTags(dispatch)
    fetchTrendProducts(dispatch)
  }, [])

  const onPickSuccess = result => updateTmpPost(dispatch, tmpPost, tmpPost.img_src_list.length > 0
    // 既に1枚でも写真が選択されている場合
    ? {img_src_list: Object.assign([], [...tmpPost.img_src_list, result.uri])}
    // 写真の選択が初めてだった場合
    : {thumbnail_img: result.uri, img_src_list: [result.uri]}
  )

  const deleteImage = target => () => {
    const newList = tmpPost.img_src_list.filter(uri => uri !== target)
    updateTmpPost(dispatch, tmpPost, tmpPost.thumbnail_img === target
      ? {thumbnail_img: newList[0] || "", img_src_list: newList}
      : {img_src_list: newList}
    )
  }


  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <ScrollView horizontal={true} style={styles.imageContainer}>
            {tmpPost.img_src_list && tmpPost.img_src_list.map(uri =>
              <View key={uri}>
                <Image source={{uri}} style={styles.image} />
                <IconButton icon="close" size={15} style={styles.deleteImageButton} onPress={deleteImage(uri)} />
              </View>)}
            {tmpPost.img_src_list && tmpPost.img_src_list.length < 5 &&
              <TouchableOpacity style={styles.image} onPress={() => pickImage(onPickSuccess)}>
                <IconButton icon="camera-plus-outline" />
              </TouchableOpacity>}
          </ScrollView>
          <TextInput style={styles.description} onChangeText={text => updateTmpPost(dispatch, tmpPost, {description: text}, false)} placeholder="キャプションを書く(必須)" multiline={true} />
          <ErrorMessage messages={descriptionError} />
          <View style={styles.inputContainer}>
            <Text style={styles.label}>カテゴリ</Text>
            <MakeUpCategoryInput tmpState={tmpPost} onPress={category => () => updateTmpPost(dispatch, tmpPost, {makeup_categories: category})} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>色</Text>
            <ColorPaletteInput tmpState={tmpPost} onColorInputPress={color => () => updateTmpPost(dispatch, tmpPost, {color})} onGlitterInputPress={glitter => () => updateTmpPost(dispatch, tmpPost, {glitter})} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>国</Text>
            <CountryInput tmpState={tmpPost} onPress={country => () => updateTmpPost(dispatch, tmpPost, {country})} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>タグ付け</Text>
            <FakeInput navigation={navigation} icon="pound" linkTo="SelectTags" placeholder="タグ付け" style={styles.FakeInput} />
            {/* eslint-disable-next-line react/display-name */}
            {tmpPost.tags !== "" && <List rows={tmpPost.tags.map(tag => ({title: tag, style: styles.listItem, right: () => <IconButton icon="close" onPress={() => updateTmpTags(dispatch, tmpPost.tags, tag)} />}))} />}
            <IconLabel icon="trending-up" color={primary} size={20} style={{marginTop: 10}}>急上昇</IconLabel>
            <ChipList items={trendTags} />
          </View>
          <View style={styles.inputContainer}>
            <TextWithImportantLabel label="必須">使用アイテム</TextWithImportantLabel>
            <FakeInput navigation={navigation} icon="pound" linkTo="SelectProducts" placeholder="使用アイテム" style={styles.FakeInput} />
            {/* eslint-disable-next-line react/display-name */}
            {tmpPost.products !== "" && <List rows={tmpPost.products.map(product => ({title: product.product_name, style: styles.listItem, right: () => <IconButton icon="close" onPress={() => updateTmpProducts(dispatch, tmpPost.products, product)} />}))} />}
            <ErrorMessage messages={productError} />
            <IconLabel icon="trending-up" color={primary} size={20} style={{marginTop: 10}}>急上昇</IconLabel>
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
      <Button
        mode="contained"
        style={styles.button}
        contentStyle={styles.buttonContentStyle}
        onPress={onSubmit(tmpPost, willUpdate, dispatch, tmpUser, navigation, setDescriptionError, setProductError, setIsLoading, user.user_id)}
        disabled={tmpPost.description === "" || tmpPost.products.length === 0 || tmpPost.thumbnail_img === ""}
      >投稿する</Button>
      <Loading isLoading={isLoading} />
    </>
  )
}
