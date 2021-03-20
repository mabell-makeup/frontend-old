/* eslint-disable react/display-name */
import React, {useEffect} from "react"
import {List} from "../../components/List"
import {Button, IconButton} from "react-native-paper"
import {ScrollView, View} from "react-native"
import {updateConditions, updateSearchResult, initialState, fetchTrendTags, fetchTrendProducts, updateTmpTags, updateTmpProducts, updateTmpConditions} from "../../stores/searchStore"
import {ColorPaletteInput} from "../../components/ColorPaletteInput"
import {CountryInput} from "../../components/CountryInput"
import {PersonalColorInput} from "../../components/PersonalColorInput"
import {FaceTypeInput} from "../../components/FaceTypeInput"
import {MakeUpCategoryInput} from "./MakeUpCategoryInput"
import {FakeInput} from "../../components/FakeInput"
import {isEqual} from "../../helper/storeHelper"
import {PRODUCT_SEARCH_PLACE_HOLDER, TAG_SEARCH_PLACE_HOLDER} from "../../styles/constants"
import {SkinTypeInput} from "../../components/SkinTypeInput"
import {ChipList} from "../../components/ChipList"
import {useDispatch, useSelector} from "react-redux"

const styles = {
  button: {
    height: 50,
    margin: 5,
    justifyContent: "center"
  },
  buttonLabel: {
    fontSize: 16
  },
  buttonContentStyle: {
    height: "100%"
  },
  accordion: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1
  },
  accordionTitle: {
    fontWeight: "bold"
  },
  FakeInput: {
    marginTop: 10,
    maxHeight: 35
  },
  listItem: {
    height: 40,
    borderBottomWidth: 0.5
  },
  inputContainer: {
    paddingHorizontal: 10
  }
}

const handlePress = (dispatch, navigation) => () => {
  updateSearchResult(dispatch)
  updateConditions(dispatch)
  navigation.navigate("NewsFeed", {screen: "Women"})
}

const createRows = conditions => conditions.map(({title, inner}) => 
  ({title: title, rows: [inner], expanded: true, style: styles.accordion, titleStyle: styles.accordionTitle, theme:{colors: {primary:"#000"}}})
)

const createTrendTags = (dispatch, tmpConditions, tags) => tags.map(tag => ({
  label: `#${tag.tag_name}`,
  onPress: () => updateTmpTags(dispatch, tmpConditions.tags, tag.tag_name)
}))

const createTrendProducts = (dispatch, tmpConditions, products) => products.map(product => ({
  label: `#${product.product_name}`,
  onPress: () => updateTmpProducts(dispatch, tmpConditions.products, product)
}))


// eslint-disable-next-line max-lines-per-function
export const SelectConditions = ({navigation}) => {
  const dispatch = useDispatch()
  const {tmpConditions, suggestionTags, suggestionProducts, post_count} = useSelector(({
    search: {tmpConditions, suggestionTags, suggestionProducts, post_count}
  }) => ({tmpConditions, suggestionTags, suggestionProducts, post_count}))

  useEffect(() => {
    fetchTrendTags(dispatch)
    fetchTrendProducts(dispatch)
  }, [])
  const trendTags = createTrendTags(dispatch, tmpConditions, suggestionTags)
  const trendProducts = createTrendProducts(dispatch, tmpConditions, suggestionProducts)
  
  // TODO: 後でコンポーネントの外に出す
  const conditions = [
    {title: "カテゴリで絞り込む", inner: <MakeUpCategoryInput key="makeUpCategory" />},
    {title: "色で絞り込む", inner: <ColorPaletteInput key="color" tmpState={tmpConditions} onColorInputPress={color => () => updateTmpConditions(dispatch, tmpConditions, {color})} onGlitterInputPress={glitter => () => updateTmpConditions(dispatch, tmpConditions, {glitter})} />},
    {title: "国で絞り込む", inner: <CountryInput key="country" tmpState={tmpConditions} onPress={country => () => updateTmpConditions(dispatch, tmpConditions, {country})} />},
    {title: "パーソナルカラーで絞り込む", inner: <PersonalColorInput key="personalColor" />},
    {title: "顔型で絞り込む", inner: <FaceTypeInput key="faceType" />},
    {title: "肌タイプで絞り込む", inner: <SkinTypeInput key="skinType" />},
    {
      title: "タグで絞り込む",
      inner:
        // eslint-disable-next-line react/jsx-indent
        <View key="tags" style={styles.inputContainer}>
          <FakeInput placeholder={TAG_SEARCH_PLACE_HOLDER} navigation={navigation} linkTo="SelectTags" key="tag" style={styles.FakeInput} />
          {tmpConditions.tags.length > 0 && <List rows={tmpConditions.tags.map(tag => ({title: tag, style: styles.listItem, right: () => <IconButton icon="close" onPress={() => updateTmpTags(dispatch, tmpConditions.tags, tag)} />}))} />}
          <ChipList items={trendTags} />
        </View>
    },
    {
      title: "使用アイテムで絞り込む",
      inner:
        // eslint-disable-next-line react/jsx-indent
        <View key="products" style={styles.inputContainer}>
          <FakeInput placeholder={PRODUCT_SEARCH_PLACE_HOLDER} navigation={navigation} linkTo="SelectProducts" key="product" style={styles.FakeInput} />
          {tmpConditions.products.length > 0 && <List rows={tmpConditions.products.map(product => ({title: product.product_name, style: styles.listItem, right: () => <IconButton icon="close" onPress={() => updateTmpProducts(dispatch, tmpConditions.products, product)} />}))} />}
          <ChipList items={trendProducts} />
        </View>
    }
  ]
  
  const rows = createRows(conditions)

  return (
    <>
      <ScrollView>
        <List rows={rows} />
      </ScrollView>
      <Button mode="contained" style={styles.button} labelStyle={styles.buttonLabel} contentStyle={styles.buttonContentStyle} onPress={handlePress(dispatch, navigation)} disabled={isEqual(initialState.tmpConditions, tmpConditions)}>{`絞り込む ${post_count}件`}</Button>
    </>
  )
}