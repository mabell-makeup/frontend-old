import React, {useEffect} from "react"
import {ScrollView, StyleSheet, Text} from "react-native"
import {List} from "../components/List"
import {Button, Checkbox} from "react-native-paper"
import {fetchProducts, fetchTrendProducts} from "../stores/appStore"
import {IconTextInput} from "../components/IconTextInput"
import {PRODUCT_SEARCH_PLACE_HOLDER} from "../styles/constants"
import {useDispatch, useSelector} from "react-redux"
import {openReportProductNotFoundPage} from "../helper/contactHelper"

const styles = StyleSheet.create({
  container: {
    marginTop: 5
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
  link: {
    fontWeight: "bold",
    color: "#0099ff"
  },
  contactLink: {
    marginTop: 30,
    alignSelf: "center"
  }
})

const onReportProductNotFound = async (dispatch, selectedProducts, updateTmpProductsFunc, navigation) => {
  const trackingId = await openReportProductNotFoundPage()
  const count = selectedProducts.filter(product => product.product_name.includes("未登録コスメ")).length
  updateTmpProductsFunc(dispatch, selectedProducts, {product_id: trackingId, brand_name: "", product_name: `未登録コスメ${count + 1}(投稿後に運営が紐付けます)`})
  navigation.goBack()
}

const createRows = (dispatch, suggestionProducts, selectedProducts, updateTmpProductsFunc) =>
  suggestionProducts.map(product => ({
    title: `${product.brand_name}-${product.product_name}`,
    key: product.product_id,
    // eslint-disable-next-line react/display-name
    right: () => <Checkbox status={selectedProducts.map(p => p.product_id).includes(product.product_id) ? "checked" : "unchecked"} color="#333" />,
    onPress: () => updateTmpProductsFunc(dispatch, selectedProducts, product),
    style: {height: 50, borderBottomWidth: 0.5, borderColor: "#ccc"}
  }))


export const SelectProductsInner = ({navigation, products, updateTmpProductsFunc}) => {
  const dispatch = useDispatch()
  const suggestionProducts = useSelector(({app: {suggestionProducts}}) => suggestionProducts)
  const rows = createRows(dispatch, suggestionProducts, products, updateTmpProductsFunc)

  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerTitle: () => <IconTextInput placeholder={PRODUCT_SEARCH_PLACE_HOLDER} onChangeText={text => fetchProducts(dispatch, text)} />
    })
    fetchTrendProducts(dispatch)
  }, [dispatch])

  return (
    <>
      <ScrollView style={styles.container}>
        <List rows={rows} />
        <Text style={styles.contactLink}>アイテムが見つからない場合は <Text style={styles.link} onPress={() => onReportProductNotFound(dispatch, products, updateTmpProductsFunc, navigation)}>こちら</Text></Text>
      </ScrollView>
      <Button mode="contained" style={styles.button} contentStyle={styles.buttonContentStyle} onPress={() => navigation.goBack()}>使用アイテムを追加</Button>
    </>
  )
}