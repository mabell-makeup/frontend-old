import React, {useEffect} from "react"
import {ScrollView} from "react-native"
import {List} from "../../components/List"
import {Checkbox} from "react-native-paper"
import {IconTextInput} from "../../components/IconTextInput"
import {PRODUCT_SEARCH_PLACE_HOLDER} from "../../styles/constants"
import {updateTmpProducts} from "../../stores/searchStore"
import {fetchTrendProducts, fetchProducts} from "../../stores/appStore"
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

const createRows = (dispatch, suggestionProducts, selectedProducts, navigtaion) =>
  suggestionProducts.map(product => ({
    title: `${product.brand_name}-${product.product_name}`,
    key: product.product_id,
    // eslint-disable-next-line react/display-name
    right: () => <Checkbox status={selectedProducts.map(p => p.product_id).includes(product.product_id) ? "checked" : "unchecked"} color="#333" />,
    onPress: () => {
      updateTmpProducts(dispatch, selectedProducts, product)
      navigtaion.goBack()
    },
    style: {height: 50, borderBottomWidth: 0.5, borderColor: "#ccc"}
  }))


export const SelectProducts = ({navigation}) => {
  const dispatch = useDispatch()
  const {suggestionProducts, products} = useSelector(({app: {suggestionProducts}, search: {tmpConditions: {products}}}) => ({suggestionProducts, products}))
  const rows = createRows(dispatch, suggestionProducts, products, navigation)

  useEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: true,
      headerBackTitle: "Back",
      // eslint-disable-next-line react/display-name
      headerTitle: () => <IconTextInput placeholder={PRODUCT_SEARCH_PLACE_HOLDER} onChangeText={text => fetchProducts(dispatch, text)} />
    })
    fetchTrendProducts(dispatch)
  }, [dispatch])

  return (
    <ScrollView style={styles.container}>
      <List rows={rows} />
    </ScrollView>
  )
}