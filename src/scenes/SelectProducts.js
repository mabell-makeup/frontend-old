import React, {useEffect} from "react"
import {ScrollView} from "react-native"
import {List} from "../components/List"
import {Button, Checkbox} from "react-native-paper"
import {fetchProducts, fetchTrendProducts} from "../stores/appStore"
import {IconTextInput} from "../components/IconTextInput"
import {PRODUCT_SEARCH_PLACE_HOLDER} from "../styles/constants"
import {useDispatch, useSelector} from "react-redux"

const styles = {
  container: {
    marginTop: 5
  },
  button: {
    height: 50,
    marginHorizontal: 5,
    marginTop: 30,
    justifyContent: "center"
  },
  buttonContentStyle: {
    height: "100%"
  }
}

const createRows = (dispatch, suggestionProducts, selectedProducts, updateTmpProductsFunc) =>
  suggestionProducts.map(product => ({
    title: `${product.brand_name}-${product.product_name}`,
    key: product.product_id,
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
    <ScrollView style={styles.container}>
      <List rows={rows} />
      <Button mode="contained" style={styles.button} contentStyle={styles.buttonContentStyle} onPress={() => navigation.goBack()}>使用アイテムを追加</Button>
    </ScrollView>
  )
}